import { useContext } from 'react';

import CartList from './list/CartList';
import CartFooter from './footer/CartFooter';
import Modal from '../ui/modal/Modal';
import WaiterContext from '../store/waiter-context';
import styles from './Cart.module.css';

const Cart = () => {
  const waiterCtx = useContext(WaiterContext);

  const orederedMeals = waiterCtx.order.positions.map((position) => {
    return {
      meal: waiterCtx.menu.find((meal) => meal.id === position.mealId),
      amount: position.amount,
    };
  });

  return (
    <Modal cardClassName={styles.cart}>
      <CartList
        items={orederedMeals}
        onAdd={waiterCtx.addOrderPosition}
        onRemove={waiterCtx.removeOrderPosition}
      />
      <CartFooter total={waiterCtx.order.totalPrice} />
    </Modal>
  );
};

export default Cart;
