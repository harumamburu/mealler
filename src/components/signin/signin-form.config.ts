import {
  createFormFieldConfig,
  FormConfig,
  matchesRegexpRule,
  minLengthRule,
} from '../../lib/form-util';
import styles from './SignIn.module.css';

export const signInFormConfig: FormConfig = {
  email: {
    ...createFormFieldConfig(
      'email',
      (isValid) => `${styles.input} ${isValid ? '' : styles.invalid}`,
      'Email',
      'signin-email',
      {
        type: 'email',
        maxLength: 100,
      }
    ),
    validations: [
      matchesRegexpRule(
        'Email',
        /^[\w\.\-]+@[\w\.\-]+\.\w{1,4}$/,
        "please make sure it's a valid e-mail"
      ),
    ],
  },
  password: {
    ...createFormFieldConfig(
      'password',
      (isValid) => `${styles.input} ${isValid ? '' : styles.invalid}`,
      'Password',
      'signin-password',
      {
        type: 'password',
        maxLength: 50,
      }
    ),
    validations: [minLengthRule('Password', 6)],
  },
};
