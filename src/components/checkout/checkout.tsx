import { useContext } from 'react';

import { AddressContextProvider } from '../../store/addresses-context';
import AuthContext from '../../store/auth-context';
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
        {!authCtx.userId && (
          <>
            <p>
              {'Have a profile?'}
              <button className={styles.signin} onClick={() => modalCtx.setModal('signin', true)}>
                Sign In
              </button>
              {'to look up your known addresses'}
            </p>
            <hr />
          </>
        )}
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
