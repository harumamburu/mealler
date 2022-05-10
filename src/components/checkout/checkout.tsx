import { useContext } from 'react';

import Button from '../ui/button/Button';
import checkoutFormConfig from './checkout-form.config';
import Modal from '../ui/modal/Modal';
import ModalContext from '../../store/modal-context';
import useForm from '../../hooks/use-form';
import styles from './Checkout.module.css';

const Checkout = () => {
  const modalCtx = useContext(ModalContext);
  const [renderInputs, isFormValid] = useForm(checkoutFormConfig);

  return (
    <Modal cardClassName={styles.checkout}>
      <form>
        <>
          {renderInputs()}
          <div className={styles.controls}>
            <Button onClick={() => modalCtx.setModal('checkout', false)}>Cancel</Button>
            <Button main disabled={!isFormValid()}>
              Confirm
            </Button>
          </div>
        </>
      </form>
    </Modal>
  );
};

export default Checkout;
