import { useEffect, useState } from 'react';

import './index.scss';
import graphQLClient from '../../graphql/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import Message from '../Message';
import InputText from '../InputText';
import Select from '../Select';
import Repositories from '../Repositories';

function Main() {
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

  if (loading) return <Message>Loading...</Message>;
  if (error) return <Message>Something wen&apos;t wrong. Please reload the page</Message>;

  return (
    <main className="main">
      <InputText
        value={ nameSearch }
        handleChange={ setNameSearch }
        placeholder="Find a repository..."
      />

      <div className="main__menus">
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

      <Repositories
        repositories={ repositories }
        typeFilter={ typeFilter }
        sort={ sort }
        nameSearch={ nameSearch }
      />
    </main>
  );
}

export default Main;
