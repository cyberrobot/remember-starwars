import {
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
import React from 'react';
import { getImagePlaceholder } from '../../helpers/image-placeholder';

export async function getServerSideProps({ query }: NextApiRequest) {
  const page = query.page || 1;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://swapi.dev/api/${query.category}?page=${page}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

type CategoryProps = {
  data: asyncResponse;
};

type asyncResponse = {
  count: number;
  next: string;
  previous: string;
  results: {
    name?: string;
    title?: string;
  }[];
};

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
  },
  innerContainer: {
    position: 'relative',
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

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <LoadingOverlay visible={isRefreshing} overlayOpacity={0.8} />
        <Grid>
          {data.results.map((category, index) => {
            const url = getImagePlaceholder();
            const { name, title } = category;
            return (
              <Grid.Col span={2} key={index}>
                <Paper
                  shadow="md"
                  p="xl"
                  radius="md"
                  sx={{ backgroundImage: `url(${url})` }}
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
          })}
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
