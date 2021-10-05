import { useEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const endpoint = 'https://api.github.com/graphql';
    const query = gql`
      {
        user(login: "adryanrosa") {
          repositories(last: 20) {
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
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer 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',
      },
    });

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
      {
        repositories.map(({ node }) => (
          <h3 key={ node.id }>{node.name}</h3>
        ))
      }
    </section>
  );
}

export default Repositories;
