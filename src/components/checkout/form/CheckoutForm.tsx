import React, { useCallback, useContext, useEffect, useState } from 'react';

import Address from '../../../model/Address';
import AddressContext from '../../../store/addresses-context';
import Button from '../../ui/button/Button';
import checkoutFormConfig from './checkout-form.config';
import Input from '../../ui/input/Input';
import ModalContext from '../../../store/modal-context';
import OrderContext from '../../../store/order-context';
import Spinner from '../../ui/spinner/Spinner';
import { submitOrder } from '../../../lib/api';
import SubmittedOrder from '../../../model/SubmittedOrder';
import useForm from '../../../hooks/use-form';
import useHttp, { Status } from '../../../hooks/use-http';
import styles from './CheckoutForm.module.css';

const CheckoutForm = (props: { userId: string }) => {
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const { renderInputs, isFormValid, getFormValues, updateFormValues, resetForm } =
    useForm(checkoutFormConfig);
  const { httpCallback, error, status } = useHttp(submitOrder);

  const addressCtx = useContext(AddressContext);
  const orderCtx = useContext(OrderContext);
  const modalCtx = useContext(ModalContext);
  const cleanUp = useCallback(() => {
    orderCtx.clearOrder();
    addressCtx.setCurrentAddress('');
    resetForm();
    modalCtx.setModal('checkout', false);
    modalCtx.setModal('orderDone', true);
  }, [resetForm]);

  const { currentAddress } = addressCtx;
  useEffect(() => {
    if (!!currentAddress) {
      const { name, phone, email = '', street, house, appartment = '' } = currentAddress;
      updateFormValues({ name, phone, email, street, house, appartment });
    } else {
      resetForm();
    }
  }, [currentAddress]);
  useEffect(() => {
    if (status === Status.COMPLETED && !error) {
      cleanUp();
    }
  }, [status, error, cleanUp]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (props.userId) {
      const form = getFormValues() as Address;
      if (isSavingAddress) {
        addressCtx.saveAddress(form);
      }

      const order = {
        date: new Date().toDateString(),
        positions: orderCtx.positions,
        address: form,
      } as SubmittedOrder;
      httpCallback(props.userId, order);
    } else {
      cleanUp();
    }
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
          />
        )}
        <div
          className={styles.controls}
          style={status === Status.PENDING ? { justifyContent: 'center' } : {}}
        >
          {status !== Status.PENDING && (
            <>
              <Button onClick={() => modalCtx.setModal('checkout', false)}>Cancel</Button>
              <Button type="submit" main disabled={!isFormValid()}>
                Confirm
              </Button>
            </>
          )}
          {status === Status.PENDING && <Spinner />}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </>
    </form>
  );
};

export default CheckoutForm;
