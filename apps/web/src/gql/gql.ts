/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query getProducts(\n    $page: Float!\n    $take: Float!\n    $search: String\n    $category: [String!]!\n  ) {\n    products(page: $page, take: $take, search: $search, category: $category) {\n      items {\n        id\n        title\n        description\n        price\n        discountPercentage\n        rating\n        stock\n        brand\n        category\n        thumbnail\n        images\n      }\n      total\n    }\n    categories\n  }\n": types.GetProductsDocument,
    "\n  query getProductById($id: Float!) {\n    product(id: $id) {\n      id\n      title\n      description\n      price\n      discountPercentage\n      rating\n      stock\n      brand\n      category\n      thumbnail\n      images\n    }\n  }\n": types.GetProductByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProducts(\n    $page: Float!\n    $take: Float!\n    $search: String\n    $category: [String!]!\n  ) {\n    products(page: $page, take: $take, search: $search, category: $category) {\n      items {\n        id\n        title\n        description\n        price\n        discountPercentage\n        rating\n        stock\n        brand\n        category\n        thumbnail\n        images\n      }\n      total\n    }\n    categories\n  }\n"): (typeof documents)["\n  query getProducts(\n    $page: Float!\n    $take: Float!\n    $search: String\n    $category: [String!]!\n  ) {\n    products(page: $page, take: $take, search: $search, category: $category) {\n      items {\n        id\n        title\n        description\n        price\n        discountPercentage\n        rating\n        stock\n        brand\n        category\n        thumbnail\n        images\n      }\n      total\n    }\n    categories\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductById($id: Float!) {\n    product(id: $id) {\n      id\n      title\n      description\n      price\n      discountPercentage\n      rating\n      stock\n      brand\n      category\n      thumbnail\n      images\n    }\n  }\n"): (typeof documents)["\n  query getProductById($id: Float!) {\n    product(id: $id) {\n      id\n      title\n      description\n      price\n      discountPercentage\n      rating\n      stock\n      brand\n      category\n      thumbnail\n      images\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;