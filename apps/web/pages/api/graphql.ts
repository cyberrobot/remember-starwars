import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import products from '../../src/graphql/products.json';
import {
  buildSchema,
  Resolver,
  Query,
  Arg,
  ObjectType,
  Field,
  ID,
} from 'type-graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: number;
  @Field(() => String)
  title!: string;
  @Field(() => String)
  description!: string;
  @Field(() => Number)
  price!: number;
  @Field(() => Number)
  discountPercentage!: number;
  @Field(() => Number)
  rating!: number;
  @Field(() => Number)
  stock!: number;
  @Field(() => String)
  brand!: string;
  @Field(() => String)
  category!: string;
  @Field(() => String)
  thumbnail!: string;
  @Field(() => [String])
  images?: string[];
}

@Resolver(Product)
export class ProductsResolver {
  @Query(() => [Product])
  products(): Product[] {
    return products;
  }
}

const schema = buildSchema({
  resolvers: [ProductsResolver],
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
