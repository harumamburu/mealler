import PropTypes from 'prop-types';

import MealItemControls from './MealItemControls';
import MealItemDescription from './MealItemDescription';
import styles from './MealItem.module.css';

const MealItem = (props) => {
  return (
    <li className={styles.meal}>
      <MealItemDescription
        className={styles['description-block']}
        name={props.name}
        description={props.description}
        price={props.price}
      />
      <MealItemControls name={props.name} />
    </li>
  );
};

MealItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default MealItem;
