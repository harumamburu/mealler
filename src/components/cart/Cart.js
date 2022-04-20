import { useContext } from 'react';

import CartList from './list/CartList';
import CartFooter from './footer/CartFooter';
import Modal from '../ui/modal/Modal';
import OrderContext from '../store/order-context';
import styles from './Cart.module.css';

const Cart = () => {
  const waiterCtx = useContext(OrderContext);

  return (
    <Modal cardClassName={styles.cart}>
      <CartList
        orderedItems={waiterCtx.order.positions}
        onAdd={waiterCtx.addOrderPosition}
        onRemove={waiterCtx.removeOrderPosition}
      />
      <CartFooter total={+waiterCtx.order.totalPrice} />
    </Modal>
  );
};

export default Cart;
