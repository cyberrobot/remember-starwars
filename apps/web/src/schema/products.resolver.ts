import { Query, Resolver } from 'type-graphql';
import { Product } from './products';
import products from './products.json';

@Resolver(Product)
export class ProductsResolver {
  @Query(() => [Product])
  products(): Product[] {
    return products;
  }
}
