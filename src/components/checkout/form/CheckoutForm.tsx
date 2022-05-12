import React, { useState } from 'react';

import Address from '../../../model/Address';
import Button from '../../ui/button/Button';
import checkoutFormConfig from './checkout-form.config';
import { saveAddress } from '../../../lib/api';
import Input from '../../ui/input/Input';
import useForm from '../../../hooks/use-form';
import useHttp from '../../../hooks/use-http';
import styles from './CheckoutForm.module.css';

const CheckoutForm = (props: { userId: string; onCancel: () => void }) => {
  const [renderInputs, isFormValid, getFormValues, resetForm] = useForm(checkoutFormConfig);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const { error, httpCallback } = useHttp(saveAddress);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = getFormValues() as Address;
    if (isSavingAddress) {
      httpCallback(props.userId, form);
    }
    resetForm();
  };

  return (
    <form className={styles.checkoutform} onSubmit={submitHandler}>
      <>
        {renderInputs()}
        {props.userId && (
          <Input
            id="save"
            name="save"
            className={`${styles.checkbox} ${styles.input}`}
            label="Remember Address"
            value="save"
            config={{ type: 'checkbox' }}
            onChange={(event) => setIsSavingAddress(event.target.checked)}
            isValid={!error}
            errorMessages={error ? [error] : []}
          />
        )}
        <div className={styles.controls}>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button type="submit" main disabled={!isFormValid()}>
            Confirm
          </Button>
        </div>
      </>
    </form>
  );
};

export default CheckoutForm;
