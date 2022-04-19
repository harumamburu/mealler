import CartList from './list/CartList';
import CartFooter from './footer/CartFooter';
import Modal from '../ui/modal/Modal';
import styles from './Cart.module.css';

const ORDER = [
  { meal: { name: 'Sushi', description: 'Finest fish and veggies', price: 22.99 }, amount: 2 },
  { meal: { name: 'Barbeque Burger', description: 'Mmmeaty', price: 12.99 }, amount: 1 },
  { meal: { name: 'Green Bowl', description: 'Healthy...and green...', price: 18.99 }, amount: 1 },
];

const Cart = () => {
  return (
    <Modal cardClassName={styles.cart}>
      <CartList items={ORDER} />
      <CartFooter
        total={ORDER.map((item) => item.meal.price * item.amount).reduce(
          (prev, curr) => prev + curr,
          0
        )}
      />
    </Modal>
  );
};

export default Cart;
