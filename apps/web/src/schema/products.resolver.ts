import { Arg, Query, Resolver } from 'type-graphql';
import { Product } from './products';
import products from './products.json';

@Resolver(Product)
export class ProductsResolver {
  @Query(() => [Product])
  products(
    @Arg('page') page: number,
    @Arg('take') take: number,
    @Arg('search', { defaultValue: '' }) search: string
  ): Product[] {
    return products
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice((page - 1) * take, page * take);
  }
}
