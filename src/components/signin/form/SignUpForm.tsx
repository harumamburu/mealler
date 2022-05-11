import { useEffect, useState } from 'react';

import Button from '../../ui/button/Button';
import FireBaseAuthResponse from '../../../model/FireBaseAuthResponse';
import { signUp } from '../../../lib/api';
import Spinner from '../../ui/spinner/Spinner';
import signUpFormConfig from './signup-form.config';
import useForm from '../../../hooks/use-form';
import useHttp, { Status } from '../../../hooks/use-http';
import styles from './SignageForm.module.css';

const SignUpForm = (props: {
  closeModal: () => void;
  logInAndNavigate: (
    data: FireBaseAuthResponse | undefined,
    status: Status | undefined,
    error: string | undefined
  ) => void;
}) => {
  const [renderInputs, isFormValid, getFormValues] = useForm(signUpFormConfig);
  const { data, error, status, httpCallback } = useHttp(signUp);
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    const form = getFormValues() as {
      email: string;
      password: string;
      checkPassword: string;
    };
    if (form.password !== form.checkPassword) {
      setErrorMessage("Provided passwords don't match");
      return;
    }

    httpCallback(form.email, form.password);
  };

  useEffect(() => {
    props.logInAndNavigate(data, status, error);
  }, [data, status, error]);
  useEffect(() => {
    setErrorMessage(error || '');
  }, [error]);

  return (
    <form className={styles.signage} onSubmit={submitHandler}>
      <>{renderInputs()}</>
      {status !== Status.PENDING && (
        <div className={styles.controls}>
          <Button onClick={props.closeModal}>Cancel</Button>
          <Button main type="submit">
            Sign Up
          </Button>
        </div>
      )}
      {status === Status.PENDING && <Spinner />}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
  );
};

export default SignUpForm;
