import {
  Button,
  Card,
  Container,
  createStyles,
  Grid,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { getImagePlaceholder } from '../helpers/image-placeholder';

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://swapi.dev/api/people');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

type PeopleResponse = {
  count: number;
  next: string;
  previous: string;
  results: People[];
};

type People = {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
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
}));

export default function Characters({ data }: { data: PeopleResponse }) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Grid>
        {data.results.map((person, index) => {
          const { name } = person;
          return (
            <Grid.Col span={2} key={index}>
              <Paper
                shadow="md"
                p="xl"
                radius="md"
                sx={{ backgroundImage: `url(${getImagePlaceholder()})` }}
                className={classes.card}
              >
                <div>
                  <Title order={3} className={classes.title}>
                    {name}
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
  );
}
