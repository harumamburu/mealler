import PropTypes from 'prop-types';

import Button from '../../../ui/button/Button';
import styles from './CartItemControls.module.css';

const CartItemControls = (props) => {
  return (
    <div className={styles.controls}>
      <Button className={styles.button} onClick={() => props.onAdd(props.orderedMeal, 1)}>
        +
      </Button>
      <Button className={styles.button} onClick={() => props.onRemove(props.orderedMeal, 1)}>
        -
      </Button>
    </div>
  );
};

CartItemControls.propTypes = {
  orderedMeal: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItemControls;
