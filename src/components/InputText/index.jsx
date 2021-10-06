import './index.scss';

function InputText({ value, handleChange, placeholder }) {
  return (
    <input
      value={ value }
      onChange={ ({ target }) => handleChange(target.value) }
      className="input-text"
      placeholder={ placeholder }
      type="text"
    />
  );
}

export default InputText;
