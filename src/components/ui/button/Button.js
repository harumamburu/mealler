import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={`${styles.button} ${props.className ? props.className : ''}}`}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
