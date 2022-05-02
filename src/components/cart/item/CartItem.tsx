import CartItemControls from './CartItemControls';
import MealItemDescription from '../../meals/item/MealItemDescription';
import styles from './CartItem.module.css';
import OrderedMeal from '../../../model/OrderedMeal';

const CartItem = (props: {
  orderedItem: OrderedMeal;
  onAdd: (amount: number) => void;
  onRemove: (amount: number) => void;
}) => {
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

export default CartItem;
