import { AutocompleteItem, Button, createStyles, Grid, LoadingOverlay, Paper, Title } from '@mantine/core';
import { dehydrate } from '@tanstack/react-query';
import lodashDebounce from 'lodash/debounce';
import { NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { SearchInput } from '../../components/SearchInput';
import { GetProductsQuery, useGetProductsQuery } from '../../src/__generated__/generates';
import { gqlClient, queryClient } from '../../src/api';

export async function getServerSideProps({ query }: NextApiRequest) {
  const page = query.page || 1;

  await queryClient.prefetchQuery(['products'], () =>
    useGetProductsQuery(gqlClient)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type CategoryProps = {
  data: AsyncResponse;
};

export type AsyncResponse = {
  products: {
    title?: string;
    thumbnail?: string;
  }[];
  count: number;
};

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
  },
  innerContainer: {
    position: 'relative',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  autocompleteContainer: {
    width: '400px',
    marginBottom: theme.spacing.md,
  },
  card: {
    height: 350,
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
    fontSize: theme.fontSizes.xl * 1.3,
    marginTop: theme.spacing.xs,
  },
  pages: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
}));

export default function Category() {
  const { data, isLoading } = useGetProductsQuery<GetProductsQuery>(
    gqlClient,
    {}
  );
  console.log('first data', data);
  const { classes } = useStyles();
  const router = useRouter();
  const initialPage = router.query.page || 1;
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [queryResults, setQueryResults] = useState<AutocompleteItem[]>();

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [data?.products]);

  const handlePageChange = (page: number) => {
    setIsRefreshing(true);
    router.push({
      pathname: `/${router.query.category}`,
      query: { page },
    });
  };

  // const getPageCount = () => {
  //   return Math.ceil(data.count / 10);
  // };

  const onQueryChange = useMemo(
    () =>
      lodashDebounce((value: string) => {
        if (!value) return setQueryResults([]);

        const searchEndpoint = (query: string) => {
          return `http://localhost:3000/api/graphql`;
        };

        fetch(searchEndpoint(value))
          .then((res) => res.json())
          .then((res) => {
            setQueryResults(
              res.results.map((item: any) => {
                return {
                  ...item,
                  value: item.name || item.title,
                };
              })
            );
          });
      }, 300),
    []
  );

  const pageData = useMemo(
    () =>
      data?.products.map((product, index) => {
        const { title, thumbnail } = product;
        return (
          <Grid.Col span={3} key={index}>
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
      <div className={classes.innerContainer}>
        <div className={classes.searchContainer}>
          <SearchInput
            onChange={onQueryChange}
            data={queryResults?.length ? queryResults : []}
            className={classes.autocompleteContainer}
          />
        </div>
        <LoadingOverlay visible={isRefreshing} overlayOpacity={0.8} />
        <Grid>{pageData}</Grid>
      </div>
      <div className={classes.pages}>
        {/* <Pagination
          total={getPageCount()}
          siblings={1}
          page={+initialPage}
          onChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
}
