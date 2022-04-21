import PropTypes from 'prop-types';

import CartItemAmount from './CartItemAmount';
import CartItemControls from './CartItemControls';
import MealItemDescription from '../../meals/item/MealItemDescription';
import styles from './CartItem.module.css';

const CartItem = (props) => {
  return (
    <li className={styles.cartitem}>
      <MealItemDescription className={styles.description} meal={props.orderedItem.meal} />
      <CartItemAmount name={props.orderedItem.meal.name} amount={props.orderedItem.amount} />
      <CartItemControls
        orderedMeal={props.orderedItem.meal}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
      />
    </li>
  );
};

CartItem.propTypes = {
  orderedItem: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
