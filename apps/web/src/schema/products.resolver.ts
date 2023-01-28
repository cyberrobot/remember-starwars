import { Arg, Query, Resolver } from 'type-graphql';
import { Product } from './products';
import products from './products.json';

@Resolver(Product)
export class ProductsResolver {
  @Query(() => [Product])
  products(@Arg('page') page: number, @Arg('take') take: number): Product[] {
    return products.slice((page - 1) * take, page * take);
  }
}
