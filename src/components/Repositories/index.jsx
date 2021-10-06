import { useEffect, useState } from 'react';

import './index.scss';
import graphQLClient from '../../graphql/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import Repository from '../Repository';

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await graphQLClient.request(GET_REPOSITORIES);
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
    <main className="repositories">
      <ul className="repositories__grid">
        {
          repositories.map(({ node }) => (
            <Repository key={ node.id } node={ node } />
          ))
        }
      </ul>
    </main>
  );
}

export default Repositories;
