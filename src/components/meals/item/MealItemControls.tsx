import {
  createFormFieldConfig,
  createInputValidationRule,
  FormConfig,
} from '../../../lib/form-util';

import useForm from '../../../hooks/use-form';
import Button from '../../ui/button/Button';
import styles from './MealItemControls.module.css';

const MealItemControls = (props: {
  name: string;
  onOrder: (amount: number) => void;
  className?: string;
}) => {
  const formConfig: FormConfig = {
    amount: {
      ...createFormFieldConfig(
        'amount',
        (isValid) => `${styles.amount} ${isValid ? '' : styles.invalid}`,
        'Amount',
        `amount_${props.name}`,
        {
          type: 'number',
          min: '1',
          step: '1',
        }
      ),
      validations: [
        createInputValidationRule('amount', '', (input) => +input > 0 && +input % 1 === 0),
      ],
    },
  };
  const [formRenderCallback, formValidityCallback, resetFormCallback] = useForm(formConfig);

  const orderSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (formValidityCallback()) {
      const value = resetFormCallback() as { [key: string]: string };
      props.onOrder(+value['amount']);
    }
  };

  return (
    <form className={styles.controls} onSubmit={orderSubmitHandler}>
      <>
        {formRenderCallback()}
        <Button type="submit" main>
          + Add
        </Button>
      </>
    </form>
  );
};

export default MealItemControls;
