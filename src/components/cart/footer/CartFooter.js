import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import styles from './CartFooter.module.css';

const CartFooter = (props) => {
  return (
    <footer>
      <div className={styles.total}>
        <h3>Total Amount</h3>
        <h3>{props.total}</h3>
      </div>
      <div className={styles.controls}>
        <Button>Close</Button>
        <Button isMain>Order</Button>
      </div>
    </footer>
  );
};

CartFooter.propTypes = {
  total: PropTypes.number,
};

export default CartFooter;
