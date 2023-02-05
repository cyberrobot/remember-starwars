import {
  Grid,
  LoadingOverlay,
  Navbar,
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
import { LinksGroup } from '../../components/LinksGroup';

export async function getServerSideProps({ query }: NextApiRequest) {
  const page = query.page || 1;
  await queryClient.fetchQuery(['getProducts', page], () =>
    gqlClient.request(GetProductsDocument, {
      page: Number(page),
      take: 50,
      category: [],
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
  const [itemsPerPage, setItemsPerPage] = useState('50');
  const [categories, setCategories] = useState<string[]>([]);
  const { data, isLoading } = useQuery<GetProductsQuery>(
    ['getProducts', searchQuery, initialPage, itemsPerPage, categories],
    () =>
      gqlClient.request(GetProductsDocument, {
        page: Number(initialPage),
        take: Number(itemsPerPage),
        search: searchQuery,
        category: categories,
      })
  );
  const { classes, theme } = useStyles();

  const handlePageChange = (page: number) => {
    router.push({
      pathname: `/shop`,
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
      data?.products.items.map((product, index) => {
        const { title, thumbnail } = product;
        return (
          <Grid.Col sm={6} md={4} lg={3} key={index} className={classes.card}>
            <div className={classes.thumbnailContainer}>
              <Image
                src={thumbnail}
                fill
                object-fit="cover"
                alt={title}
                sizes="(max-width: 500px) 100vw, (max-width: 500px) 50vw, 33vw"
              />
            </div>
            <Title className={classes.title}>{title}</Title>
            <Text className={classes.price}>£{product.price.toFixed(2)}</Text>
          </Grid.Col>
        );
      }),
    [
      data?.products.items,
      classes.card,
      classes.title,
      classes.thumbnailContainer,
      classes.price,
    ]
  );

  const selectItems: SelectItem[] = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

  const sideNavItems = [
    {
      label: 'Category',
      links: data?.categories?.map((category) => {
        let _category = category.replace(/-/g, ' ');
        return {
          label: _category.charAt(0).toUpperCase() + _category.slice(1),
          value: category,
        };
      }),
    },
  ];

  const onCategoryChange = (categories: string[]) => {
    setCategories(categories);
  };

  const links = sideNavItems.map((item) => (
    <LinksGroup {...item} key={item.label} onClick={onCategoryChange} />
  ));

  return (
    <div className={classes.container}>
      <header className={classes.searchContainer}>
        <SearchInput
          onChange={onQueryChange}
          data={
            data?.products?.items.length
              ? toAutocompleteItems(data?.products.items)
              : []
          }
          className={classes.autocompleteContainer}
        />
      </header>
      <article className={classes.productListContainer}>
        <LoadingOverlay visible={isLoading} overlayOpacity={0.8} />
        <Grid gutter={theme.spacing.xl * 2}>{pageData}</Grid>
      </article>
      <aside className={classes.aside}>
        <Navbar>
          <Navbar.Section grow>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>
        </Navbar>
      </aside>
      {data?.products.items.length ? (
        <footer className={classes.footer}>
          <Pagination
            total={getPageCount(data?.products.total!, itemsPerPage)}
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
        </footer>
      ) : null}
    </div>
  );
}
