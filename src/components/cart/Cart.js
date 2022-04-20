import { useContext } from 'react';

import CartList from './list/CartList';
import CartFooter from './footer/CartFooter';
import Modal from '../ui/modal/Modal';
import OrderContext from '../store/order-context';
import styles from './Cart.module.css';

const Cart = () => {
  const orderCtx = useContext(OrderContext);

  return (
    <Modal cardClassName={styles.cart}>
      <CartList
        orderedItems={orderCtx.order.positions}
        onAdd={orderCtx.addOrderPosition}
        onRemove={orderCtx.removeOrderPosition}
      />
      <CartFooter total={+orderCtx.order.totalPrice} />
    </Modal>
  );
};

export default Cart;
