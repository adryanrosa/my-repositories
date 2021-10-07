import './index.scss';

function Message({ children }) {
  return (
    <p className="message">
      {children}
    </p>
  );
}

export default Message;
