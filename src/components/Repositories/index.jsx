import { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';

import Repository from '../Repository';

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const endpoint = 'https://api.github.com/graphql';
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer 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',
      },
    });
    const query = gql`
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
              }
            }
          }
        }
      }
    `;

    const fetchData = async () => {
      try {
        const { user } = await graphQLClient.request(query);
        setRepositories(user.repositories.edges);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return 'Loading';
  if (error) return 'Something wen\'t wrong. Please reload';

  return (
    <section>
      <ul>
        {
          repositories.map(({ node }) => (
            <Repository key={ node.id } node={ node } />
          ))
        }
      </ul>
    </section>
  );
}

export default Repositories;
