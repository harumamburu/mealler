import { useState } from 'react';

import Button from '../../ui/button/Button';
import checkoutFormConfig from './checkout-form.config';
import Input from '../../ui/input/Input';
import useForm from '../../../hooks/use-form';
import styles from './CheckoutForm.module.css';

const CheckoutForm = (props: { userId: string; onCancel: () => void }) => {
  const [renderInputs, isFormValid] = useForm(checkoutFormConfig);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saveAddress, setSaveAddress] = useState(false);

  return (
    <form className={styles.checkoutform}>
      <>
        {renderInputs()}
        {props.userId && (
          <Input
            id="save"
            name="save"
            className={`${styles.checkbox} ${styles.input}`}
            label="Remember Address"
            value="save"
            config={{
              type: 'checkbox',
            }}
            onChange={(event) => setSaveAddress(event.target.checked)}
          />
        )}
        <div className={styles.controls}>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button main disabled={!isFormValid()}>
            Confirm
          </Button>
        </div>
      </>
    </form>
  );
};

export default CheckoutForm;
