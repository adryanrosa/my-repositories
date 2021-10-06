import './index.scss';

function Topic({ children }) {
  return (
    <span className="topic">
      {children}
    </span>
  );
}

export default Topic;
