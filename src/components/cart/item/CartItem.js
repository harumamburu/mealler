import PropTypes from 'prop-types';

import CartItemControls from './CartItemControls';
import MealItemDescription from '../../meals/item/MealItemDescription';
import styles from './CartItem.module.css';

const CartItem = (props) => {
  return (
    <li className={styles.cartitem}>
      <MealItemDescription className={styles.description} meal={props.orderedItem} />
      <div className={styles.amount}>
        <span>{`x ${props.orderedItem.amount}`}</span>
      </div>
      <CartItemControls
        orderedMeal={props.orderedItem}
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
