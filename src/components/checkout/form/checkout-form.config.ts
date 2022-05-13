import {
  createFormFieldConfig,
  doesntMatchRegexpRule,
  FormConfig,
  matchesRegexpRule,
  requiredRule,
} from '../../../lib/form-util';
import styles from './CheckoutForm.module.css';

const checkoutFormConfig: FormConfig = {
  name: {
    ...createFormFieldConfig(
      'name',
      (isValid) => `${styles.input} ${styles.required} ${isValid ? '' : styles.invalid}`,
      'Name',
      'checkout-name',
      {
        type: 'text',
        maxLength: 70,
      }
    ),
    validations: [
      requiredRule('Name'),
      doesntMatchRegexpRule(
        'Name',
        /[1-9!@#$%^&*()\-_=+[{\]};:\\|/?>,<~\]]+|^$/,
        'No special characters/digits are allowed'
      ),
    ],
  },
  phone: {
    ...createFormFieldConfig(
      'phone',
      (isValid) => `${styles.input} ${styles.required} ${isValid ? '' : styles.invalid}`,
      'Phone',
      'checkout-phone',
      {
        type: 'tel',
        placeholder: '+1(888)123-4567',
      }
    ),
    validations: [
      requiredRule('Phone'),
      matchesRegexpRule(
        'Phone',
        /^\+([0-9]){1,3}\(([0-9]){1,3}\)([0-9\-]){6,10}$/,
        '+1(888)123-456 with other codes'
      ),
    ],
  },
  email: {
    ...createFormFieldConfig(
      'email',
      (isValid) => `${styles.input} ${isValid ? '' : styles.invalid}`,
      'Email',
      'checkout-email',
      {
        type: 'email',
        maxLength: 100,
      }
    ),
    validations: [
      matchesRegexpRule(
        'Email',
        /^[\w\.\-]+@[\w\.\-]+\.\w{1,4}$|^$/,
        "please make sure it's a valid e-mail"
      ),
    ],
  },
  street: {
    ...createFormFieldConfig(
      'street',
      (isValid) => `${styles.input} ${styles.required} ${isValid ? '' : styles.invalid}`,
      'Street',
      'checkout-street',
      {
        type: 'text',
        maxLength: 70,
      }
    ),
    validations: [requiredRule('Street')],
  },
  house: {
    ...createFormFieldConfig(
      'house',
      (isValid) => `${styles.input} ${styles.required} ${isValid ? '' : styles.invalid}`,
      'House',
      'checkout-house',
      {
        type: 'text',
        maxLength: 5,
      }
    ),
    validations: [requiredRule('House')],
  },
  appartment: {
    ...createFormFieldConfig(
      'appartment',
      () => `${styles.input}`,
      'Appartment',
      'checkout-appartment',
      {
        type: 'text',
        maxLength: 5,
      }
    ),
    validations: [],
  },
};

export default checkoutFormConfig;
