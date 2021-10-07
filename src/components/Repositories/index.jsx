import { useEffect, useState } from 'react';

import './index.scss';
import graphQLClient from '../../graphql/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import Repository from '../Repository';
import InputText from '../InputText';
import Select from '../Select';

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [nameSearch, setNameSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sort, setSort] = useState('Last updated');

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
  if (error) return 'Something wen\'t wrong. Please reload the page';

  return (
    <main className="repositories">
      <InputText
        value={ nameSearch }
        handleChange={ setNameSearch }
        placeholder="Find a repository..."
      />

      <div className="repositories__menus">
        <Select
          id="type"
          text="Type"
          items={ ['Private', 'Fork', 'Archived'] }
          handleClick={ setTypeFilter }
          all
        />

        <Select
          id="sort"
          text="Sort"
          items={ ['Name', 'Last updated'] }
          handleClick={ setSort }
        />
      </div>

      <ul className="repositories__grid">
        {
          repositories
            .filter(({ node }) => node.name.includes(nameSearch))
            .filter(({ node }) => (typeFilter ? node[`is${typeFilter}`] : true))
            .sort((a, b) => (sort === 'Name'
              ? a.node.name.localeCompare(b.node.name)
              : b.node.updatedAt.localeCompare(a.node.updatedAt)
            ))
            .map(({ node }) => (
              <Repository key={ node.id } node={ node } />
            ))
        }
      </ul>
    </main>
  );
}

export default Repositories;
