import { useContext, useEffect, useState } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../button/Button';
import ModalContext from '../../store/modal-context';
import WaiterContext from '../../store/waiter-context';
import styles from './CartButton.module.css';

const CartButton = () => {
  const [orderedAmount, setOrderedAmount] = useState(0);
  const modalCtx = useContext(ModalContext);
  const waiterCtx = useContext(WaiterContext);
  useEffect(
    () => setOrderedAmount(waiterCtx.order.reduce((total, position) => total + position.amount, 0)),
    [waiterCtx.order]
  );

  return (
    <Button className={styles.cartbutton} onClick={() => modalCtx.setModal('cart', true)}>
      <FontAwesomeIcon icon={faCartShopping} />
      <label htmlFor="cartAmt">Your Cart</label>
      <input
        id="cartAmt"
        type="text"
        value={orderedAmount}
        size={orderedAmount.toString.length}
        readOnly
      />
    </Button>
  );
};

CartButton.propTypes = {};

export default CartButton;
