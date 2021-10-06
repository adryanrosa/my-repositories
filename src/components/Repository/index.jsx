import Topic from '../Topic';
import './index.scss';
import Github from '../../icons/Github';
import Live from '../../icons/Live';

function Repository(
  { node: { name, createdAt, repositoryTopics, description, url, homepageUrl } },
) {
  const date = new Date(createdAt);

  return (
    <li className="repository">
      <div>
        <h3>{name}</h3>

        {
          repositoryTopics.edges.length > 0 && (
            <div className="repository__topics">
              {
                repositoryTopics.edges.map(({ node }) => (
                  <Topic key={ node.topic.id }>{node.topic.name}</Topic>
                ))
              }
            </div>
          )
        }

        <p>{description || 'There\'s no description for this repository'}</p>
      </div>

      <div className="repository__footer">
        <div>
          <p className="repository__time">
            Created at:
            {' '}
            <time
              dateTime={ date }
            >
              {date.toLocaleDateString('pt-br')}
            </time>
          </p>
        </div>

        <div className="repository__icons">
          <a href={ url } target="_blank" rel="noreferrer">
            <Github />
          </a>

          {
            homepageUrl && (
              <a href={ homepageUrl } target="_blank" rel="noreferrer">
                <Live />
              </a>
            )
          }
        </div>
      </div>
    </li>
  );
}

export default Repository;
