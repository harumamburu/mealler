import PropTypes from 'prop-types';

import styles from './CartItemAmount.module.css';

const CartItemAmount = (props) => {
  return (
    <div className={styles.amount}>
      <input id={props.name} type="text" value={`x ${props.amount}`} readOnly />
    </div>
  );
};

CartItemAmount.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number.isRequired,
};

export default CartItemAmount;
