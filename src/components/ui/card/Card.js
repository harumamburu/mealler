import PropTypes from 'prop-types';

import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
