import PropTypes from 'prop-types';

import Cartitem from './CartItem';
import styles from './CartList.module.css';

const CartList = (props) => {
  return (
    <ul className={styles.cartlist}>
      {props.items.map((item) => (
        <Cartitem
          key={item.meal.id}
          id={item.meal.id}
          name={item.meal.name}
          price={item.meal.price}
          amount={item.amount}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
        />
      ))}
    </ul>
  );
};

CartList.propTypes = {
  items: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

export default CartList;
