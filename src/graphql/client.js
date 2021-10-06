import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.github.com/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'Bearer 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',
  },
});

export default graphQLClient;
