import { useContext } from 'react';

import Button from '../ui/button/Button';
import checkoutFormConfig from './checkout-form.config';
import Modal from '../ui/modal/Modal';
import ModalContext from '../store/modal-context';
import useForm from '../hooks/use-form';
import styles from './Checkout.module.css';

const Checkout = () => {
  const modalCtx = useContext(ModalContext);
  const [renderForm, isFormValid] = useForm(checkoutFormConfig);

  return (
    <Modal cardClassName={styles.checkout}>
      <form>
        <>
          {renderForm()}
          <div className={styles.controls}>
            <Button onClick={() => modalCtx.setModal('checkout', false)}>Cancel</Button>
            <Button isMain disabled={!isFormValid()}>
              Confirm
            </Button>
          </div>
        </>
      </form>
    </Modal>
  );
};

export default Checkout;
