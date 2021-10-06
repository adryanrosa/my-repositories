import { useEffect, useState } from 'react';

import './index.scss';
import graphQLClient from '../../graphql/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import Repository from '../Repository';
import InputText from '../InputText';

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [nameSearch, setNameSearch] = useState('');

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
      <InputText
        value={ nameSearch }
        handleChange={ setNameSearch }
        placeholder="Find a repository..."
      />

      <ul className="repositories__grid">
        {
          repositories
            .filter(({ node }) => node.name.includes(nameSearch))
            .map(({ node }) => (
              <Repository key={ node.id } node={ node } />
            ))
        }
      </ul>
    </main>
  );
}

export default Repositories;
