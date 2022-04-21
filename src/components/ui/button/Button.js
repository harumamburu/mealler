import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = (props) => {
  const style = props.disabled ? styles.disabled : props.isMain ? styles.mainbutton : styles.button;

  return (
    <button
      className={`${props.className || ''} ${styles.shape} ${style}`}
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  isMain: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
