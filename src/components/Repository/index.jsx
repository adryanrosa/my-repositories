import './index.scss';

function Repository({ node: { name, createdAt, description, url, homepageUrl } }) {
  const date = new Date(createdAt);

  return (
    <li className="repository">
      <h3>{name}</h3>

      <time
        dateTime={ date }
      >
        {date.toLocaleDateString('pt-br')}
      </time>

      <p>{description || 'There\'s no description for this repository'}</p>

      <a href={ url } target="_blank" rel="noreferrer">Repository</a>

      {
        homepageUrl && (
          <a href={ homepageUrl } target="_blank" rel="noreferrer">App</a>
        )
      }
    </li>
  );
}

export default Repository;
