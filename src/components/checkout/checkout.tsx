import { createFormFieldConfig, FormConfig } from '../../lib/form-util';
import useForm from '../hooks/use-form';
import Modal from '../ui/modal/Modal';

const Checkout = () => {
  const formConfig: FormConfig = {
    name: {
      ...createFormFieldConfig('name', () => '', 'Name', 'checkout-name', {
        type: 'text',
        maxLength: 70,
      }),
      validations: [],
    },
    email: {
      ...createFormFieldConfig('email', () => '', 'Email', 'checkout-email', {
        type: 'email',
        maxLength: 100,
      }),
      validations: [],
    },
    phone: {
      ...createFormFieldConfig('phone', () => '', 'Phone', 'checkout-phone', {
        type: 'tel',
        placeholder: '+1(888)123-4567',
      }),
      validations: [],
    },
    street: {
      ...createFormFieldConfig('street', () => '', 'Street', 'checkout-street', {
        type: 'text',
        maxLength: 70,
      }),
      validations: [],
    },
    house: {
      ...createFormFieldConfig('house', () => '', 'House', 'checkout-house', {
        type: 'text',
        maxLength: 5,
      }),
      validations: [],
    },
    appartment: {
      ...createFormFieldConfig('appartment', () => '', 'Appartment', 'checkout-appartment', {
        type: 'text',
        maxLength: 5,
      }),
      validations: [],
    },
    save: {
      ...createFormFieldConfig('save', () => '', 'Remember Address', 'checkout-save', {
        type: 'checkbox',
      }),
      validations: [],
    },
  };
  const [renderForm, ,] = useForm(formConfig);

  return (
    <Modal>
      <form>
        <>{renderForm()}</>
      </form>
    </Modal>
  );
};

export default Checkout;
