import { useContext } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../ui/button/Button';
import ModalContext from '../../store/modal-context';
import OrderContext from '../../store/order-context';
import styles from './CartButton.module.css';

const CartButton = () => {
  const modalCtx = useContext(ModalContext);
  const waiterCtx = useContext(OrderContext);

  return (
    <Button className={styles.cartbutton} onClick={() => modalCtx.setModal('cart', true)}>
      <FontAwesomeIcon icon={faCartShopping} />
      <label htmlFor="cartAmt">Your Cart</label>
      <input
        id="cartAmt"
        type="text"
        value={waiterCtx.order.totalAmount}
        size={waiterCtx.order.totalAmount.toString.length}
        readOnly
      />
    </Button>
  );
};

CartButton.propTypes = {};

export default CartButton;
