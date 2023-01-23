import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient('http://localhost:3000/api/graphql');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
