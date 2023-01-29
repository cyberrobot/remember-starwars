import { graphql } from '../src/gql';

export const GetProductsDocument = graphql(/* GraphQL */ `
  query getProducts($page: Float!, $take: Float!, $search: String) {
    products(page: $page, take: $take, search: $search) {
      id
      title
      description
      price
      discountPercentage
      rating
      stock
      brand
      category
      thumbnail
      images
    }
    total
  }
`);
