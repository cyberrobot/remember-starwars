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
    @Arg('category', (type) => [String]) category: string[]
  ): {
    items: Product[];
    total: number;
  } {
    return {
      items: products
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) => {
          if (category.length === 0) {
            return true;
          }
          return category.includes(product.category.toLowerCase());
        })
        .slice((page - 1) * take, page * take),
      total: products.filter((product) => {
        if (category.length === 0) {
          return true;
        }
        return category.includes(product.category.toLowerCase());
      }).length,
    };
  }
  @Query(() => [String])
  categories(): string[] {
    return [...new Set(products.map((product) => product.category))];
  }
  @Query(() => Product)
  product(@Arg('id') id: number): Product {
    return products.find((product) => product.id === id) as Product;
  }
}
