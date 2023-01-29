import {
  Grid,
  LoadingOverlay,
  Pagination,
  Select,
  SelectItem,
  Text,
  Title,
} from '@mantine/core';
import { dehydrate, useQuery } from '@tanstack/react-query';
import lodashDebounce from 'lodash/debounce';
import { NextApiRequest } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { SearchInput } from '../../components/SearchInput';
import { gqlClient, queryClient } from '../../src/api';
import { GetProductsQuery } from '../../src/gql/graphql';
import { useStyles } from '../../styles/category';
import { getPageCount, toAutocompleteItems } from '../../helpers/category';
import { GetProductsDocument } from '../../documents/get-products';

export async function getServerSideProps({ query }: NextApiRequest) {
  const page = query.page || 1;
  await queryClient.fetchQuery(['getProducts', page], () =>
    gqlClient.request(GetProductsDocument, {
      page: Number(page),
      take: 25,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Category() {
  const router = useRouter();
  const initialPage = router.query.page || 1;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState('25');
  const { data, isLoading } = useQuery<GetProductsQuery>(
    ['getProducts', searchQuery, initialPage, itemsPerPage],
    () =>
      gqlClient.request(GetProductsDocument, {
        page: Number(initialPage),
        take: Number(itemsPerPage),
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

  const onQueryChange = useMemo(
    () =>
      lodashDebounce((value: string) => {
        setSearchQuery(value || '');
      }, 300),
    []
  );

  const pageData = useMemo(
    () =>
      data?.products.map((product, index) => {
        const { title, thumbnail, category } = product;
        return (
          <Grid.Col sm={4} md={3} lg={2} key={index} className={classes.card}>
            <div className={classes.thumbnailContainer}>
              <Image src={thumbnail} fill object-fit="cover" alt={title} />
            </div>
            <Title className={classes.title}>{title}</Title>
            <Text className={classes.category}>{category}</Text>
          </Grid.Col>
        );
      }),
    [
      data?.products,
      classes.card,
      classes.title,
      classes.category,
      classes.thumbnailContainer,
    ]
  );

  const selectItems: SelectItem[] = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

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
          gutter={theme.spacing.xl * 2}
        >
          {pageData}
        </Grid>
      </div>
      <div className={classes.footer}>
        <Pagination
          total={getPageCount(data?.total!, itemsPerPage)}
          siblings={1}
          page={+initialPage}
          onChange={handlePageChange}
        />
        <div className={classes.itemsPerPageContainer}>
          <span>Items:</span>
          <Select
            classNames={{
              input: classes.itemsPerPageSelect,
            }}
            data={selectItems}
            onChange={(value) => setItemsPerPage(value!)}
            defaultValue={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
