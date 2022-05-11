import { createFormFieldConfig, FormConfig } from '../../../lib/form-util';
import signInFormConfig from './signin-form.config';
import styles from './SignageForm.module.css';

const signUpFormConfig: FormConfig = {
  ...signInFormConfig,
  checkPassword: {
    ...createFormFieldConfig(
      'checkPassword',
      (isValid) => `${styles.input} ${isValid ? '' : styles.invalid}`,
      'Repeat Password',
      'signin-checkPassword',
      {
        type: 'password',
        maxLength: 50,
      }
    ),
    validations: [],
  },
};

export default signUpFormConfig;
