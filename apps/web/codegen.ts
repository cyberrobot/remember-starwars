import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  documents: [
    './pages/**/*.ts',
    './pages/**/*.tsx',
    '!./node_modules/**/*',
    '!./**/*.d.ts',
    '!./**/*.spec.ts',
    '!./**/*.spec.tsx',
  ],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};
export default config;
