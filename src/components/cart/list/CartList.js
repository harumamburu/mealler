import PropTypes from 'prop-types';

import CartItem from './item/CartItem';
import styles from './CartList.module.css';

const CartList = (props) => {
  return (
    <ul className={styles.cartlist}>
      {props.orderedItems.map((orderedItem) => (
        <CartItem
          key={orderedItem.meal.id}
          orderedItem={orderedItem}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
        />
      ))}
    </ul>
  );
};

CartList.propTypes = {
  orderedItems: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

export default CartList;
