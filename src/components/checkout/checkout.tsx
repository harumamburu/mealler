import useForm from '../hooks/use-form';

import checkoutFormConfig from './checkout-form.config';
import Modal from '../ui/modal/Modal';
import styles from './Checkout.module.css';
import Button from '../ui/button/Button';

const Checkout = () => {
  const [renderForm, ,] = useForm(checkoutFormConfig);

  return (
    <Modal cardClassName={styles.checkout}>
      <form>
        <>
          {renderForm()}
          <div className={styles.controls}>
            <Button>Cancel</Button>
            <Button isMain>Confirm</Button>
          </div>
        </>
      </form>
    </Modal>
  );
};

export default Checkout;
