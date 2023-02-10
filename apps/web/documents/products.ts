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

export const GetProductByIdDocument: any = graphql(/* GraphQL */ `
  query getProductById($id: Float!) {
    product(id: $id) {
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
  }
`);
