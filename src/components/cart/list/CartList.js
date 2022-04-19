import PropTypes from 'prop-types';

import Cartitem from './CartItem';
import styles from './CartList.module.css';

const CartList = (props) => {
  return (
    <ul className={styles.cartlist}>
      {props.items.map((item) => (
        <Cartitem
          key={item.meal.name}
          name={item.meal.name}
          price={item.meal.price}
          amount={item.amount}
        />
      ))}
    </ul>
  );
};

CartList.propTypes = {
  items: PropTypes.array,
};

export default CartList;
