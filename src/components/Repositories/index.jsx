import './index.scss';

import Repository from '../Repository';

function Repositories({ repositories, typeFilter, sort, nameSearch }) {
  return (
    <ul className="repositories">
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
  );
}

export default Repositories;
