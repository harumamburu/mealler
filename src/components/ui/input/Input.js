import PropTypes from 'prop-types';

import styles from './Input.module.css';

const Input = (props) => {
  return (
    <div className={`${styles.input} ${props.isValid ? '' : styles.invalid}`}>
      {props.label && <label htmlFor={props.input.id}>Amount</label>}
      <input id={props.input.id} {...props.input} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  isValid: PropTypes.bool,
  input: PropTypes.object.isRequired,
};

export default Input;
