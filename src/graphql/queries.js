import { gql } from 'graphql-request';

export const GET_REPOSITORIES = gql`
  {
    user(login: "adryanrosa") {
      repositories(last: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            id
            name
            createdAt
            description
            homepageUrl
            url
            isPrivate
            isFork
            isArchived
            updatedAt
            repositoryTopics(last: 10) {
              edges {
                node {
                  topic {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
