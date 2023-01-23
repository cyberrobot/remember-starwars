import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import { ProductsResolver } from '../../src/schema/products.resolver';
import { NextApiRequest, NextApiResponse } from 'next';

const schema = buildSchema({
  resolvers: [ProductsResolver],
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
