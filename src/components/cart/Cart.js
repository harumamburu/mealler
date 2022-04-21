import { useContext } from 'react';

import CartFooter from './footer/CartFooter';
import CartItem from './item/CartItem';
import Modal from '../ui/modal/Modal';
import OrderContext from '../store/order-context';
import styles from './Cart.module.css';

const Cart = () => {
  const orderCtx = useContext(OrderContext);

  return (
    <Modal>
      <ul className={styles.cartlist}>
        {orderCtx.order.positions.map((orderedItem) => (
          <CartItem
            key={orderedItem.meal.id}
            orderedItem={orderedItem}
            onAdd={orderCtx.addOrderPosition}
            onRemove={orderCtx.removeOrderPosition}
          />
        ))}
      </ul>
      <CartFooter total={+orderCtx.order.totalPrice} />
    </Modal>
  );
};

export default Cart;
