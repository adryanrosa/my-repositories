import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.github.com/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_APP_AUTH_TOKEN}`,
  },
});

export default graphQLClient;
