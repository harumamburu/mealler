import { useContext } from 'react';

import Button from '../ui/button/Button';
import Modal from '../ui/modal/Modal';
import ModalContext from '../../store/modal-context';
import { signInFormConfig } from './signin-form.config';
import useForm from '../../hooks/use-form';
import styles from './SignIn.module.css';

const SignIn = () => {
  const modalCtx = useContext(ModalContext);
  const [renderForm] = useForm(signInFormConfig);

  return (
    <Modal cardClassName={styles.signin} onBackdropClick={() => modalCtx.setModal('signin', false)}>
      <h1 className={styles.header}>Sign In</h1>
      <>{renderForm()}</>
      <div className={styles.controls}>
        <Button onClick={() => modalCtx.setModal('signin', false)}>Cancel</Button>
        <Button main>Sign In</Button>
      </div>
      <p className={styles.signup}>
        New to the service? <a href="">Sign Up</a>
      </p>
    </Modal>
  );
};

export default SignIn;
