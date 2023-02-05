import { graphql } from '../src/gql';

export const GetProductsDocument: any = graphql(/* GraphQL */ `
  query getProducts(
    $page: Float!
    $take: Float!
    $search: String
    $category: [String!]!
  ) {
    products(page: $page, take: $take, search: $search, category: $category) {
      items {
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
    categories
  }
`);
