import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';
import styles from './CartItemControls.module.css';

const CartItemControls = (props) => {
  return (
    <div className={styles.controls}>
      <Button className={styles.button} onClick={() => props.onAdd(1)}>
        +
      </Button>
      <Button className={styles.button} onClick={() => props.onRemove(1)}>
        -
      </Button>
    </div>
  );
};

CartItemControls.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItemControls;
