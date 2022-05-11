import { useCallback, useContext } from 'react';

import AuthContext from '../../store/auth-context';
import FireBaseAuthResponse from '../../model/FireBaseAuthResponse';
import Modal from '../ui/modal/Modal';
import ModalContext from '../../store/modal-context';
import { Status } from '../../hooks/use-http';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import SignInForm from './SignInForm';

const SignIn = () => {
  const modalCtx = useContext(ModalContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const loginAndNavigate = useCallback(
    (
      data: FireBaseAuthResponse | undefined,
      status: Status | undefined,
      error: string | undefined
    ) => {
      if (status === Status.COMPLETED && data && !error) {
        authCtx.login(data.localId, data.idToken, +data.expiresIn);
        modalCtx.setModal('signin', false);
        if (location.pathname !== '/' && !location.pathname.includes('menu')) {
          navigate('/', { replace: true });
        }
      }
    },
    [location]
  );

  return (
    <Modal cardClassName={styles.signin} onBackdropClick={() => modalCtx.setModal('signin', false)}>
      <h1 className={`${styles.header} ${styles.centered}`}>Sign In</h1>
      <SignInForm
        logInAndNavigate={loginAndNavigate}
        closeModal={() => modalCtx.setModal('signin', false)}
      />
      <p className={styles.centered}>
        New to the service? <a href="">Sign Up</a>
      </p>
    </Modal>
  );
};

export default SignIn;
