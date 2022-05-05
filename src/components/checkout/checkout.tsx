import {
  createFormFieldConfig,
  doesntMatchRegexpRule,
  FormConfig,
  matchesRegexpRule,
  requiredRule,
} from '../../lib/form-util';
import useForm from '../hooks/use-form';
import Modal from '../ui/modal/Modal';

const Checkout = () => {
  const formConfig: FormConfig = {
    name: {
      ...createFormFieldConfig('name', () => '', 'Name', 'checkout-name', {
        type: 'text',
        maxLength: 70,
      }),
      validations: [
        requiredRule('Name'),
        doesntMatchRegexpRule(
          'Name',
          /[1-9!@#$%^&*()\-_=+[{\]};:\\|/?>,<~\]]+/,
          'No special characters or digits are allowed'
        ),
      ],
    },
    phone: {
      ...createFormFieldConfig('phone', () => '', 'Phone', 'checkout-phone', {
        type: 'tel',
        placeholder: '+1(888)123-4567',
      }),
      validations: [
        requiredRule('Phone'),
        matchesRegexpRule(
          'Phone',
          /^\+([0-9]){1,3}\(([0-9]){1,3}\)([0-9\-]){6,10}$/,
          '+1(888)123-456 with other possible codes'
        ),
      ],
    },
    email: {
      ...createFormFieldConfig('email', () => '', 'Email', 'checkout-email', {
        type: 'email',
        maxLength: 100,
      }),
      validations: [
        matchesRegexpRule(
          'Email',
          /^(\w[\.\-])+@(\w[\.\-])+\.\w{1,4}$/,
          "please make sure it's a valid e-mail"
        ),
      ],
    },
    street: {
      ...createFormFieldConfig('street', () => '', 'Street', 'checkout-street', {
        type: 'text',
        maxLength: 70,
      }),
      validations: [requiredRule('Street')],
    },
    house: {
      ...createFormFieldConfig('house', () => '', 'House', 'checkout-house', {
        type: 'text',
        maxLength: 5,
      }),
      validations: [requiredRule('House')],
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
