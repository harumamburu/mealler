import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import styles from './MealItemControls.module.css';

const MealItemControls = (props) => {
  const [amount, setAmount] = useState(0);
  const [isValid, setisValid] = useState(true);

  const inputChangeHandler = (event) => {
    const input = event.target.value;
    setisValid(+input > 0 && input % 1 === 0);
    setAmount(input);
  };

  const orderClickHandler = () => {
    if (isValid) {
      props.onOrder(amount);
      setAmount(0);
    }
  };

  return (
    <div className={`${styles.controls} ${props.className || ''} ${isValid ? '' : styles.invalid}`}>
      <div>
        <label htmlFor={props.name}>Amount</label>
        <input
          id={props.name}
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={inputChangeHandler}
        />
      </div>
      <Button isMain onClick={orderClickHandler}>
        + Add
      </Button>
    </div>
  );
};

MealItemControls.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onOrder: PropTypes.func,
};

export default MealItemControls;
