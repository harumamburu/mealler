import PropTypes from 'prop-types';

import MealItemDescription from '../../meals/item/MealItemDescription';
import Button from '../../ui/button/Button';
import styles from './CartItem.module.css';

const Cartitem = (props) => {
  return (
    <li className={styles.cartitem}>
      <MealItemDescription className={styles.description} name={props.name} price={props.price} />
      <div className={styles.amount}>
        <input id={props.name} type="text" value={`x ${props.amount}`} readOnly />
      </div>
      <div className={styles.controls}>
        <Button className={styles.button} onClick={() => props.onAdd(props.id, 1)}>
          +
        </Button>
        <Button className={styles.button} onClick={() => props.onRemove(props.id, 1)}>
          -
        </Button>
      </div>
    </li>
  );
};

Cartitem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Cartitem;
