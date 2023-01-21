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
import { useRouter } from 'next/router';
import { NextApiRequest } from 'next';
import React, { useCallback, useMemo, useState } from 'react';
import { getImagePlaceholder } from '../../helpers/image-placeholder';
import { SearchInput } from '../../components/SearchInput';
import lodashDebounce from 'lodash/debounce';

export async function getServerSideProps({ query }: NextApiRequest) {
  const page = query.page || 1;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library.
  const res = await fetch(
    `https://swapi.dev/api/${query.category}?page=${page}`
  );
  const data = await res.json();

  return {
    props: {
      data: {
        ...data,
        results: data.results.map((item: any) => ({
          ...item,
          imageUrl: getImagePlaceholder(),
        })),
      },
    },
  };
}

type CategoryProps = {
  data: AsyncResponse;
};

export type AsyncResponse = {
  count: number;
  next: string;
  previous: string;
  results: {
    name?: string;
    title?: string;
    imageUrl?: string;
  }[];
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

export default function Category({ data }: CategoryProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const initialPage = router.query.page || 1;
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [queryResults, setQueryResults] = useState<AutocompleteItem[]>();

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [data.results]);

  const handlePageChange = (page: number) => {
    setIsRefreshing(true);
    router.push({
      pathname: `/${router.query.category}`,
      query: { page },
    });
  };

  const getPageCount = () => {
    return Math.ceil(data.count / 10);
  };

  const onQueryChange = useMemo(
    () =>
      lodashDebounce((value: string) => {
        if (!value) return setQueryResults([]);

        const searchEndpoint = (query: string) => {
          return `https://swapi.dev/api/${router.query.category}/?search=${query}`;
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
    [router.query.category]
  );

  const pageData = useMemo(
    () =>
      data.results.map((category, index) => {
        const { name, title, imageUrl } = category;
        return (
          <Grid.Col span={3} key={index}>
            <Paper
              shadow="md"
              p="xl"
              radius="md"
              sx={{ backgroundImage: `url(${imageUrl})` }}
              className={classes.card}
            >
              <div>
                <Title order={3} className={classes.title}>
                  {name || title}
                </Title>
              </div>
              <Button variant="white" color="dark">
                Read more
              </Button>
            </Paper>
          </Grid.Col>
        );
      }),
    [data.results, classes.card, classes.title]
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
