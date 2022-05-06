import { useContext, useEffect, useState } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../ui/button/Button';
import ModalContext from '../../../store/modal-context';
import OrderContext from '../../../store/order-context';
import styles from './CartButton.module.css';

const CartButton = () => {
  const modalCtx = useContext(ModalContext);
  const orderCtx = useContext(OrderContext);
  const [isButtonAnimated, setisButtonAnimated] = useState(false);

  useEffect(() => {
    if (orderCtx.positions.length === 0) {
      return;
    }
    setisButtonAnimated(true);

    const timer = setTimeout(() => setisButtonAnimated(false), 300);
    return () => clearTimeout(timer);
  }, [orderCtx.positions]);

  return (
    <Button
      className={`${styles.cartbutton} ${isButtonAnimated ? styles.bumpy : ''}`}
      onClick={() => modalCtx.setModal('cart', true)}
    >
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
      <span className={styles.title}>Your Cart</span>
      <span className={styles.count}>{orderCtx.totalAmount}</span>
    </Button>
  );
};

export default CartButton;
