import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Product = {
  __typename?: 'Product';
  brand: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  discountPercentage: Scalars['Float'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  price: Scalars['Float'];
  rating: Scalars['Float'];
  stock: Scalars['Float'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, description: string, price: number, discountPercentage: number, rating: number, stock: number, brand: string, category: string, thumbnail: string, images: Array<string> }> };


export const GetProductsDocument = `
    query getProducts {
  products {
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
    `;
export const useGetProductsQuery = <
      TData = GetProductsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetProductsQueryVariables,
      options?: UseQueryOptions<GetProductsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProductsQuery, TError, TData>(
      variables === undefined ? ['getProducts'] : ['getProducts', variables],
      fetcher<GetProductsQuery, GetProductsQueryVariables>(client, GetProductsDocument, variables, headers),
      options
    );
useGetProductsQuery.fetcher = (client: GraphQLClient, variables?: GetProductsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetProductsQuery, GetProductsQueryVariables>(client, GetProductsDocument, variables, headers);