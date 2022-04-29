import Button from '../../ui/button/Button';
import styles from './CartFooter.module.css';

const CartFooter: React.FC<{
  total: number;
  hasItems: boolean;
  closeModal: () => void;
}> = (props) => {
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
        <Button {...(props.hasItems ? { isMain: true } : { disabled: true })}>Order</Button>
      </div>
    </footer>
  );
};

export default CartFooter;
