import './index.scss';
import Chevron from '../../icons/Chevron';

function Select({ id, text, items, handleClick, all }) {
  return (
    <details id={ id } className="select">
      <summary>
        {text}
        <Chevron />
      </summary>

      <menu>
        {
          all && (
            <li>
              <button
                onClick={ () => {
                  handleClick('');
                  document.querySelector(`#${id}`).open = false;
                } }
                className="select__item"
                type="button"
              >
                All
              </button>
            </li>
          )
        }
        {
          items.map((item, index) => (
            <li key={ index }>
              <button
                onClick={ () => {
                  handleClick(item);
                  document.querySelector(`#${id}`).open = false;
                } }
                className="select__item"
                type="button"
              >
                {item}
              </button>
            </li>
          ))
        }
      </menu>
    </details>
  );
}

export default Select;
