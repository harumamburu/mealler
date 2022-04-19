import PropTypes from 'prop-types';

import styles from './MealItemDescription.module.css';

const MealItemDescription = (props) => {
  return (
    <div className={`${styles.description} ${props.className}`}>
      <h4 className={styles.name}>{props.name}</h4>
      {props.description ? <p className={styles.content}>{props.description}</p> : ''}
      <p className={styles.price}>{`$${props.price}`}</p>
    </div>
  );
};

MealItemDescription.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default MealItemDescription;
