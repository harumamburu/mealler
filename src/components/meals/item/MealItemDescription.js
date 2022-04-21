import PropTypes from 'prop-types';

import styles from './MealItemDescription.module.css';

const MealItemDescription = (props) => {
  return (
    <div className={`${styles.description} ${props.className}`}>
      <h4>{props.meal.name}</h4>
      {props.showDescription ? <p className={styles.content}>{props.meal.description}</p> : ''}
      <p className={styles.price}>{`$${props.meal.price}`}</p>
    </div>
  );
};

MealItemDescription.propTypes = {
  className: PropTypes.string,
  meal: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
};

export default MealItemDescription;
