import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import styles from './MealItem.module.css';

const MealItem = (props) => {
  return (
    <li className={styles.meal}>
      <div className={styles.description}>
        <header>{props.name}</header>
        <p className={styles.content}>{props.description}</p>
        <p className={styles.price}>{`$${props.price}`}</p>
      </div>
      <div className={styles.controls}>
        <div>
          <label htmlFor={props.name}>Amount</label>
          <input id={props.name} type="number" min="1" step="1" pattern="[0-9]" />
        </div>
        <Button>+ Add</Button>
      </div>
    </li>
  );
};

MealItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default MealItem;
