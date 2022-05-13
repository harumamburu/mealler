import { useContext } from 'react';

import ModalContext from '../../store/modal-context';
import Button from '../ui/button/Button';
import Modal from '../ui/modal/Modal';
import styles from './CheckoutConfirmation.module.css';

const CheckoutConfirmation = () => {
  const modalCtx = useContext(ModalContext);
  const closeModal = () => modalCtx.setModal('orderDone', false);

  return (
    <Modal onBackdropClick={closeModal} cardClassName={styles.confirmation}>
      <h2>Your order is confirmed!</h2>
      <p>We&apos;ll call your shortly</p>
      <Button main onClick={closeModal}>
        OK :)
      </Button>
    </Modal>
  );
};

export default CheckoutConfirmation;
