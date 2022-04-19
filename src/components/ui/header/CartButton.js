import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import Button from '../button/Button';
import styles from './CartButton.module.css';

const CartButton = () => {
  return (
    <Button className={styles.cartbutton}>
      <FontAwesomeIcon icon={faCartShopping} />
      <label htmlFor="cartAmt">Your Cart</label>
      <input id="cartAmt" type="text" value="4" size={'4'.length} readOnly />
    </Button>
  );
};

CartButton.propTypes = {};

export default CartButton;
