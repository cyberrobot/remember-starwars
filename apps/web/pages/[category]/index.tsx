import {
  AutocompleteItem,
  Button,
  createStyles,
  Grid,
  LoadingOverlay,
  Pagination,
  Paper,
  Title,
} from '@mantine/core';
import { dehydrate, useQuery } from '@tanstack/react-query';
import lodashDebounce from 'lodash/debounce';
import { NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { SearchInput } from '../../components/SearchInput';
import { graphql } from '../../src/gql';
import { gqlClient, queryClient } from '../../src/api';
import { GetProductsQuery, Product } from '../../src/gql/graphql';

const GetProductsDocument = graphql(/* GraphQL */ `
  query getProducts($page: Float!, $take: Float!, $search: String) {
    products(page: $page, take: $take, search: $search) {
      id
      title
      description
      price
      discountPercentage
      rating
      stock
      brand
      category
      thumbnail
      images
    }
    total
  }
`);

export async function getServerSideProps({ query }: NextApiRequest) {
  const page = query.page || 1;
  await queryClient.fetchQuery(['getProducts', page], () =>
    gqlClient.request(GetProductsDocument, {
      page: Number(page),
      take: 10,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const useStyles = createStyles((theme) => ({
  container: {},
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.lg * 1.25,
    backgroundColor: theme.colors.gray[3],
  },
  autocompleteContainer: {
    width: '400px',
  },
  productListContainer: {
    padding: theme.spacing.lg,
  },
  card: {
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.xl * 1.1,
    marginTop: theme.spacing.xs,
  },
  pages: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
}));

export default function Category() {
  const router = useRouter();
  const initialPage = router.query.page || 1;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data, isLoading } = useQuery<GetProductsQuery>(
    ['getProducts', searchQuery, initialPage],
    () =>
      gqlClient.request(GetProductsDocument, {
        page: Number(initialPage),
        take: 10,
        search: searchQuery,
      })
  );
  const { classes, theme } = useStyles();

  const handlePageChange = (page: number) => {
    router.push({
      pathname: `/${router.query.category}`,
      query: { page },
    });
  };

  const getPageCount = () => {
    return Math.ceil((data?.total || 0) / 10);
  };

  const onQueryChange = useMemo(
    () =>
      lodashDebounce((value: string) => {
        setSearchQuery(value || '');
      }, 300),
    []
  );

  const toAutocompleteItems = (products: Product[]): AutocompleteItem[] => {
    return products.map((product) => {
      return {
        value: product.title,
        label: product.title,
      };
    });
  };

  const pageData = useMemo(
    () =>
      data?.products.map((product, index) => {
        const { title, thumbnail } = product;
        return (
          <Grid.Col span={2} key={index}>
            <Paper
              shadow="md"
              p="xl"
              radius="md"
              sx={{ backgroundImage: `url(${thumbnail})` }}
              className={classes.card}
            >
              <div>
                <Title order={3} className={classes.title}>
                  {title}
                </Title>
              </div>
              <Button variant="white" color="dark">
                Read more
              </Button>
            </Paper>
          </Grid.Col>
        );
      }),
    [data?.products, classes.card, classes.title]
  );

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.searchContainer}>
          <SearchInput
            onChange={onQueryChange}
            data={
              data?.products?.length ? toAutocompleteItems(data?.products) : []
            }
            className={classes.autocompleteContainer}
          />
        </div>
        <LoadingOverlay visible={isLoading} overlayOpacity={0.8} />
        <Grid
          className={classes.productListContainer}
          gutter={theme.spacing.lg}
        >
          {pageData}
        </Grid>
      </div>
      <div className={classes.pages}>
        <Pagination
          total={getPageCount()}
          siblings={1}
          page={+initialPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
