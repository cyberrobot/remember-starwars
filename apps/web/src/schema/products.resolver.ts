import { Arg, Query, Resolver } from 'type-graphql';
import { Product, ProductsResponse } from './products';
import products from './products.json';

@Resolver(Product)
export class ProductsResolver {
  @Query(() => ProductsResponse)
  products(
    @Arg('page') page: number,
    @Arg('take') take: number,
    @Arg('search', { defaultValue: '' }) search: string,
    @Arg('category', { defaultValue: '' }) category: string
  ): {
    items: Product[];
    total: number;
  } {
    return {
      items: products
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) =>
          product.category.toLowerCase().includes(category.toLowerCase())
        )
        .slice((page - 1) * take, page * take),
      total: products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      ).length,
    };
  }
  @Query(() => [String])
  categories(): string[] {
    return [...new Set(products.map((product) => product.category))];
  }
}
