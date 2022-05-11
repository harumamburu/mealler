import { useContext, useEffect } from 'react';

import AuthContext from '../../store/auth-context';
import Button from '../ui/button/Button';
import { logIn } from '../../lib/api';
import Modal from '../ui/modal/Modal';
import ModalContext from '../../store/modal-context';
import { signInFormConfig } from './signin-form.config';
import useForm from '../../hooks/use-form';
import useHttp, { Status } from '../../hooks/use-http';
import styles from './SignIn.module.css';
import Spinner from '../ui/spinner/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const modalCtx = useContext(ModalContext);
  const authCtx = useContext(AuthContext);
  const [renderInputs, isFormValid, getFormValues] = useForm(signInFormConfig);
  const { data, error, status, httpCallback } = useHttp(logIn);
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    const form = getFormValues() as { email: string; password: string };
    httpCallback(form.email, form.password);
  };

  useEffect(() => {
    if (status === Status.COMPLETED && data && !error) {
      authCtx.login(data.localId, data.idToken, +data.expiresIn);
      modalCtx.setModal('signin', false);
      if (location.pathname !== '/' && !location.pathname.includes('menu')) {
        navigate('/', { replace: true });
      }
    }
  }, [data, status, error]);

  return (
    <Modal cardClassName={styles.signin} onBackdropClick={() => modalCtx.setModal('signin', false)}>
      <h1 className={`${styles.header} ${styles.centered}`}>Sign In</h1>
      <form onSubmit={submitHandler}>
        <>{renderInputs()}</>
        {status !== Status.PENDING && (
          <div className={styles.controls}>
            <Button onClick={() => modalCtx.setModal('signin', false)}>Cancel</Button>
            <Button main type="submit">
              Sign In
            </Button>
          </div>
        )}
        {status === Status.PENDING && <Spinner />}
        {error && <p className={`${styles.error} ${styles.centered}`}>{error}</p>}
      </form>
      <p className={styles.centered}>
        New to the service? <a href="">Sign Up</a>
      </p>
    </Modal>
  );
};

export default SignIn;
