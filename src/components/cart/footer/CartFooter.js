import { useContext } from 'react';
import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import ModalContext from '../../store/modal-context';
import styles from './CartFooter.module.css';

const CartFooter = (props) => {
  const modalCtx = useContext(ModalContext);

  return (
    <footer>
      <div className={styles.total}>
        <h3>Total Amount</h3>
        <h3>
          {`$${props.total.toLocaleString('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}`}
        </h3>
      </div>
      <div className={styles.controls}>
        <Button onClick={() => modalCtx.setModal('cart', false)}>Close</Button>
        <Button isMain>Order</Button>
      </div>
    </footer>
  );
};

CartFooter.propTypes = {
  total: PropTypes.number.isRequired,
};

export default CartFooter;
