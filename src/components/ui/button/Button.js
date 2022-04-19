import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={`${props.className || ''} ${styles.button} ${
        props.isMain ? styles.mainbutton : ''
      }`}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  isMain: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
