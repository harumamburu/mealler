import { useEffect } from 'react';

import Button from '../ui/button/Button';
import FireBaseAuthResponse from '../../model/FireBaseAuthResponse';
import { logIn } from '../../lib/api';
import signInFormConfig from './signin-form.config';
import Spinner from '../ui/spinner/Spinner';
import useForm from '../../hooks/use-form';
import useHttp, { Status } from '../../hooks/use-http';
import styles from './SignIn.module.css';

const SignInForm = (props: {
  closeModal: () => void;
  logInAndNavigate: (
    data: FireBaseAuthResponse | undefined,
    status: Status | undefined,
    error: string | undefined
  ) => void;
}) => {
  const [renderInputs, isFormValid, getFormValues] = useForm(signInFormConfig);
  const { data, error, status, httpCallback } = useHttp(logIn);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    const form = getFormValues() as { email: string; password: string };
    httpCallback(form.email, form.password);
  };

  useEffect(() => {
    props.logInAndNavigate(data, status, error);
  }, [data, status, error]);

  return (
    <form onSubmit={submitHandler}>
      <>{renderInputs()}</>
      {status !== Status.PENDING && (
        <div className={styles.controls}>
          <Button onClick={props.closeModal}>Cancel</Button>
          <Button main type="submit">
            Sign In
          </Button>
        </div>
      )}
      {status === Status.PENDING && <Spinner />}
      {error && <p className={`${styles.error} ${styles.centered}`}>{error}</p>}
    </form>
  );
};

export default SignInForm;
