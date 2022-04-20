import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '../../ui/button/Button';
import styles from './MealItemControls.module.css';

const MealItemControls = (props) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className={`${styles.controls} ${props.className}`}>
      <div>
        <label htmlFor={props.name}>Amount</label>
        <input
          id={props.name}
          type="number"
          min="1"
          step="1"
          pattern="[0-9]"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <Button isMain onClick={() => props.onOrder(amount)}>
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
