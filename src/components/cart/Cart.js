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
        {orderCtx.positions.map((orderedItem) => (
          <CartItem
            key={orderedItem.id}
            orderedItem={orderedItem}
            onAdd={(amount) => orderCtx.addOrderPosition({ ...orderedItem, amount: amount })}
            onRemove={(amount) => orderCtx.removeOrderPosition({ ...orderedItem, amount: amount })}
          />
        ))}
      </ul>
      <CartFooter total={orderCtx.totalPrice} />
    </Modal>
  );
};

export default Cart;
