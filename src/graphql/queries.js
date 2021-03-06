import { gql } from 'graphql-request';

export const GET_REPOSITORIES = gql`
  {
    user(login: "adryanrosa") {
      repositories(last: 20) {
        edges {
          node {
            id
            name
            createdAt
            repositoryTopics(last: 5) {
              edges {
                node {
                  topic {
                    id
                    name
                  }
                }
              }
            }
            description
            homepageUrl
            url
            isPrivate
            isFork
            isArchived
            updatedAt
          }
        }
      }
    }
  }
`;
