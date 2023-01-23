import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  documents: ['./src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/__generated__/generates.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: 'graphql-request',
        exposeFetcher: true,
      },
    },
  },
};
export default config;
