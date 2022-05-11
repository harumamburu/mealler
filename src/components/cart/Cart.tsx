import { useContext } from 'react';

import CartFooter from './footer/CartFooter';
import Modal from '../ui/modal/Modal';
import ModalContext from '../../store/modal-context';
import Order from '../order/Order';
import OrderContext from '../../store/order-context';

const Cart = () => {
  const modalCtx = useContext(ModalContext);
  const orderCtx = useContext(OrderContext);

  const orderHandler = () => {
    modalCtx.setModal('cart', false);
    modalCtx.setModal('checkout', true);
  };

  return (
    <Modal onBackdropClick={() => modalCtx.setModal('cart', false)}>
      <Order />
      <CartFooter
        total={orderCtx.totalPrice}
        hasItems={orderCtx.positions.length > 0}
        closeModal={() => modalCtx.setModal('cart', false)}
        makeOrder={orderHandler}
      />
    </Modal>
  );
};

export default Cart;
