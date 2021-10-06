import './index.scss';

function Select({ text, items, handleClick }) {
  return (
    <details className="select">
      <summary>
        {text}
      </summary>

      <menu>
        {items.map((item, index) => (
          <li key={ index }>
            <button
              onClick={ () => handleClick(item) }
              type="button"
              className="select__item"
            >
              {item}
            </button>
          </li>
        ))}
      </menu>
    </details>
  );
}

export default Select;
