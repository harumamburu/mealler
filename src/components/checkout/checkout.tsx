import { useContext } from 'react';

import { AddressContextProvider } from '../../store/addresses-context';
import AuthContext from '../../store/auth-context';
import CheckoutAddresses from './CheckoutAddresses';
import CheckoutForm from './form/CheckoutForm';
import Modal from '../ui/modal/Modal';
import ModalContext from '../../store/modal-context';
import Order from '../order/Order';
import styles from './Checkout.module.css';

const Checkout = () => {
  const modalCtx = useContext(ModalContext);
  const authCtx = useContext(AuthContext);

  return (
    <Modal cardClassName={styles.checkout}>
      <AddressContextProvider userId={authCtx.userId}>
        <CheckoutAddresses
          userId={authCtx.userId}
          onSignIn={() => modalCtx.setModal('signin', true)}
        />
        <hr />
        <Order className={styles.order} />
        <hr />
        <CheckoutForm
          userId={authCtx.userId}
          onCancel={() => modalCtx.setModal('checkout', false)}
        />
      </AddressContextProvider>
    </Modal>
  );
};

export default Checkout;
