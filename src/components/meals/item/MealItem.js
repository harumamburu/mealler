import PropTypes from 'prop-types';

import MealItemControls from './MealItemControls';
import MealItemDescription from './MealItemDescription';
import styles from './MealItem.module.css';

const MealItem = (props) => {
  return (
    <li className={styles.meal}>
      <MealItemDescription meal={props.meal} showDescription />
      <MealItemControls name={props.meal.name} onOrder={props.onOrder} />
    </li>
  );
};

MealItem.propTypes = {
  meal: PropTypes.object.isRequired,
  onOrder: PropTypes.func.isRequired,
};

export default MealItem;
