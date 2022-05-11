import { useContext } from 'react';

import OrderItem from './item/OrderItem';
import OrderContext from '../../store/order-context';
import styles from './Order.module.css';

const Order = (props: { editable?: boolean; className?: string }) => {
  const orderCtx = useContext(OrderContext);
  return (
    <ul className={`${styles.orderlist} ${props.className || ''}`}>
      {orderCtx.positions.map((orderedItem) => (
        <OrderItem
          key={orderedItem.id}
          orderedItem={orderedItem}
          editable={props.editable}
          onAdd={(amount) => orderCtx.addOrderPosition({ ...orderedItem, amount: amount })}
          onRemove={(amount) => orderCtx.removeOrderPosition({ ...orderedItem, amount: amount })}
        />
      ))}
    </ul>
  );
};

export default Order;
