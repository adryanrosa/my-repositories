import Topic from '../Topic';
import './index.scss';

function Repository(
  { node: { name, createdAt, repositoryTopics, description, url, homepageUrl } },
) {
  const date = new Date(createdAt);

  return (
    <li className="repository">
      <div>
        <h3>{name}</h3>

        <div className="repository__topics">
          {
            repositoryTopics.edges.map(({ node }) => (
              <Topic key={ node.topic.id }>{node.topic.name}</Topic>
            ))
          }
        </div>

        <p>{description || 'There\'s no description for this repository'}</p>

        <p className="repository__time">
          Last updated:
          {' '}
          <time
            dateTime={ date }
          >
            {date.toLocaleDateString('pt-br')}
          </time>
        </p>
      </div>

      <div>
        <a href={ url } target="_blank" rel="noreferrer">Repository</a>

        {
          homepageUrl && (
            <a href={ homepageUrl } target="_blank" rel="noreferrer">App</a>
          )
        }
      </div>
    </li>
  );
}

export default Repository;
