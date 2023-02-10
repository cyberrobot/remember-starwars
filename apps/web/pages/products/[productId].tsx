import React from 'react';
import { Button, Container, createStyles, Text } from '@mantine/core';
import Image from 'next/image';
import { NextApiRequest } from 'next';
import { gqlClient, queryClient } from '../../src/api';
import { GetProductByIdQuery } from '../../src/gql/graphql';
import { GetProductByIdDocument } from '../../documents/products';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getDiscountedPrice } from '../../helpers/product';
const useStyles = createStyles((theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: 2,
  },
  imageContainer: {
    flex: 4,
    display: 'block',
    width: '100%',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
    padding: '52.9% 0 0 0',
  },
  details: {
    marginLeft: theme.spacing.sm,
  },
  title: {
    marginTop: theme.spacing.xl,
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
  },
  discountedPrice: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSizes.lg,
    color: theme.colors.red[8],
    fontWeight: 700,
  },
  originalPrice: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 300,
  },
  discountPercentage: {
    color: theme.colors.red[7],
  },
  addToBagBtn: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.sm,
    textTransform: 'uppercase',
  },
  description: {
    marginTop: theme.spacing.sm,
  },
  representativePrice: {
    textDecoration: 'line-through',
  },
}));

export async function getServerSideProps({ query }: NextApiRequest) {
  const id = query.productId;
  await queryClient.fetchQuery(['getProductById', id], () =>
    gqlClient.request(GetProductByIdDocument, {
      id: Number(id),
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function ProductPage() {
  const router = useRouter();
  const productId = router.query.productId;
  const { classes, cx } = useStyles();
  const { data, isLoading } = useQuery<GetProductByIdQuery>(
    ['getProductById', productId],
    () =>
      gqlClient.request(GetProductByIdDocument, {
        id: Number(productId),
      })
  );
  const {
    product: { images, title, price, discountPercentage, description },
  } = data as GetProductByIdQuery;
  return (
    <Container>
      <div className={classes.row}>
        <div className={cx(classes.column, classes.imageContainer)}>
          {data && <Image src={images[0]} fill object-fit="cover" alt="" />}
        </div>
        <div className={cx(classes.column, classes.details)}>
          <Text className={classes.title}>{title}</Text>
          <Text className={classes.discountedPrice}>
            Now £{getDiscountedPrice(price, discountPercentage).toFixed(2)}
          </Text>
          <Text className={classes.originalPrice}>
            <span className={classes.representativePrice}>
              RRP £{price.toFixed(2)}
            </span>
            <span className={classes.discountPercentage}>
              {' '}
              (-{discountPercentage}%)
            </span>
          </Text>
          <Button className={classes.addToBagBtn}>Add to bag</Button>
          <Text className={classes.description}>{description}</Text>
        </div>
      </div>
    </Container>
  );
}
