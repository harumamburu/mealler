import MealItemDescription from '../../meals/item/MealItemDescription';
import OrderedMeal from '../../../model/OrderedMeal';
import OrderItemControls from './OrderItemControls';
import styles from './OrderItem.module.css';

const OrderItem = (props: {
  orderedItem: OrderedMeal;
  editable?: boolean;
  onAdd: (amount: number) => void;
  onRemove: (amount: number) => void;
}) => {
  return (
    <li className={styles.orderitem}>
      <MealItemDescription className={styles.description} meal={props.orderedItem} />
      <div className={styles.amount}>
        <span>{props.orderedItem.amount}</span>
      </div>
      {props.editable && (
        <OrderItemControls
          orderedMeal={props.orderedItem}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
        />
      )}
    </li>
  );
};

export default OrderItem;
