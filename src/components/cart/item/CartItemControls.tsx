import OrderedMeal from '../../../model/OrderedMeal';

import Button from '../../ui/button/Button';
import styles from './CartItemControls.module.css';

const CartItemControls = (props: {
  orderedMeal: OrderedMeal;
  onAdd: (amount: number) => void;
  onRemove: (amount: number) => void;
}) => {
  return (
    <div className={styles.controls}>
      <Button className={styles.button} onClick={() => props.onAdd(1)}>
        +
      </Button>
      <Button className={styles.button} onClick={() => props.onRemove(1)}>
        -
      </Button>
    </div>
  );
};

export default CartItemControls;
