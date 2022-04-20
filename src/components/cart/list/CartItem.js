import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import MealItemDescription from '../../meals/item/MealItemDescription';
import styles from './CartItem.module.css';

const CartItem = (props) => {
  return (
    <li className={styles.cartitem}>
      <MealItemDescription className={styles.description} meal={props.orderedItem.meal} />
      <div className={styles.amount}>
        <input
          id={props.orderedItem.meal.name}
          type="text"
          value={`x ${props.orderedItem.amount}`}
          readOnly
        />
      </div>
      <div className={styles.controls}>
        <Button className={styles.button} onClick={() => props.onAdd(props.orderedItem.meal, 1)}>
          +
        </Button>
        <Button className={styles.button} onClick={() => props.onRemove(props.orderedItem.meal, 1)}>
          -
        </Button>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  orderedItem: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
