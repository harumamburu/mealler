import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import styles from './MealItemControls.module.css';

const MealItemControls = (props) => {
  const [amount, setAmount] = useState(0);
  const [isValid, setisValid] = useState(true);

  const inputChangeHandler = (event) => {
    const input = event.target.value;
    setisValid(+input > 0 && input % 1 === 0);
    setAmount(input);
  };

  const orderSubmitHandler = (event) => {
    event.preventDefault();
    if (isValid && amount > 0) {
      props.onOrder(amount);
      setAmount(0);
    }
  };

  return (
    <form className={styles.controls} onSubmit={orderSubmitHandler}>
      <Input
        label="Amount"
        isValid={isValid}
        input={{
          id: `amount_${props.name}`,
          type: 'number',
          min: '1',
          step: '1',
          value: amount,
          onChange: inputChangeHandler,
        }}
      />
      <Button type="submit" isMain>
        + Add
      </Button>
    </form>
  );
};

MealItemControls.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onOrder: PropTypes.func.isRequired,
};

export default MealItemControls;
