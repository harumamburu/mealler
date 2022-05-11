import { useCallback, useContext, useState } from 'react';

import AuthContext from '../../store/auth-context';
import FireBaseAuthResponse from '../../model/FireBaseAuthResponse';
import Modal from '../ui/modal/Modal';
import ModalContext from '../../store/modal-context';
import SignInForm from './form/SignInForm';
import SignUpForm from './form/SignUpForm';
import { Status } from '../../hooks/use-http';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';

const SignIn = () => {
  const modalCtx = useContext(ModalContext);
  const authCtx = useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(true);
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
      <h1 className={`${styles.header} ${styles.centered}`}>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
      {isSignIn && (
        <SignInForm
          logInAndNavigate={loginAndNavigate}
          closeModal={() => modalCtx.setModal('signin', false)}
        />
      )}
      {!isSignIn && (
        <SignUpForm
          logInAndNavigate={loginAndNavigate}
          closeModal={() => modalCtx.setModal('signin', false)}
        />
      )}
      <p className={styles.centered}>
        {isSignIn ? 'New to the service?' : 'Already have a profile?'}
        <button className={styles.toggle} onClick={() => setIsSignIn((oldState) => !oldState)}>
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </Modal>
  );
};

export default SignIn;
