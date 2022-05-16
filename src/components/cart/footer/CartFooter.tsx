import Button from '../../ui/button/Button';
import styles from './CartFooter.module.css';

const CartFooter = (props: {
  total: number;
  hasItems: boolean;
  closeModal: () => void;
  clearCart: () => void;
  makeOrder: () => void;
}) => {
  return (
    <footer>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>
          {`$${props.total.toLocaleString('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}`}
        </span>
      </div>
      <div className={styles.controls}>
        <Button onClick={props.closeModal}>Close</Button>
        <Button disabled={!props.hasItems} onClick={props.clearCart}>
          Clear
        </Button>
        <Button
          {...(props.hasItems ? { main: true } : { disabled: true })}
          onClick={props.makeOrder}
        >
          Order
        </Button>
      </div>
    </footer>
  );
};

export default CartFooter;
