import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import styles from './MealItemControls.module.css';

const MealItemControls = (props) => {
  return (
    <div className={`${styles.controls} ${props.className}`}>
      <div>
        <label htmlFor={props.name}>Amount</label>
        <input id={props.name} type="number" min="1" step="1" pattern="[0-9]" />
      </div>
      <Button isMain>+ Add</Button>
    </div>
  );
};

MealItemControls.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

export default MealItemControls;
