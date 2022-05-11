import { useContext } from 'react';

import OrderItem from './item/OrderItem';
import OrderContext from '../../store/order-context';
import styles from './Order.module.css';

const Order = () => {
  const orderCtx = useContext(OrderContext);
  return (
    <ul className={styles.orderlist}>
      {orderCtx.positions.map((orderedItem) => (
        <OrderItem
          key={orderedItem.id}
          orderedItem={orderedItem}
          onAdd={(amount) => orderCtx.addOrderPosition({ ...orderedItem, amount: amount })}
          onRemove={(amount) => orderCtx.removeOrderPosition({ ...orderedItem, amount: amount })}
        />
      ))}
    </ul>
  );
};

export default Order;
