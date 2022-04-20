import { useContext } from 'react';

import CartList from './list/CartList';
import CartFooter from './footer/CartFooter';
import Modal from '../ui/modal/Modal';
import WaiterContext from '../store/waiter-context';
import styles from './Cart.module.css';

const Cart = () => {
  const waiterCtx = useContext(WaiterContext);

  const orederedMeals = waiterCtx.order.map((position) => {
    return {
      meal: waiterCtx.menu.find((meal) => meal.id === position.mealId),
      amount: position.amount,
    };
  });
  const totalPrice = orederedMeals
    .map((position) => position.meal.price * position.amount)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <Modal cardClassName={styles.cart}>
      <CartList
        items={orederedMeals}
        onAdd={waiterCtx.addOrderPosition}
        onRemove={waiterCtx.removeOrderPosition}
      />
      <CartFooter total={totalPrice} />
    </Modal>
  );
};

export default Cart;
