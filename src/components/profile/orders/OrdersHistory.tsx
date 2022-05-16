import React, { useContext, useEffect } from 'react';

import AuthContext from '../../../store/auth-context';
import { fetchOrders } from '../../../lib/api';
import OrderContext from '../../../store/order-context';
import OrderedMeal from '../../../model/OrderedMeal';
import Spinner from '../../ui/spinner/Spinner';
import SubmittedOrder from '../../../model/SubmittedOrder';
import useHttp, { Status } from '../../../hooks/use-http';
import styles from '../Profile.module.css';
import Button from '../../ui/button/Button';

const OrdersHistory = () => {
  const authCtx = useContext(AuthContext);
  const orderCtx = useContext(OrderContext);
  const { httpCallback, data, error, status } = useHttp(fetchOrders, true);

  useEffect(() => {
    httpCallback(authCtx.userId);
  }, [httpCallback]);

  const reduceHistory = (
    history: SubmittedOrder[]
  ): { [date: string]: [{ order: OrderedMeal[] }] } => {
    return history.reduce((map, order) => {
      if (!map[order.date]) {
        map[order.date] = [] as unknown as [{ order: OrderedMeal[] }];
      }
      map[order.date].push({ order: order.positions });
      return map;
    }, {} as { [date: string]: [{ order: OrderedMeal[] }] });
  };

  const renderOrder = (date: string, orders: [{ order: OrderedMeal[] }]) => {
    return (
      <React.Fragment key={`order_${date}`}>
        <tr className={styles.date}>
          <td colSpan={4}>{date}</td>
        </tr>
        {orders.map(({ order }, orderIndex) =>
          order.map((position, positionIndex) => (
            <tr key={`order_${date}_${orderIndex}_meal_${positionIndex}`}>
              {positionIndex === 0 && <td rowSpan={order.length}>{`Order #${orderIndex + 1}`}</td>}
              <td>{position.name}</td>
              <td>{`x${position.amount}`}</td>
              {positionIndex === 0 && (
                <td rowSpan={order.length} className={styles.centered}>
                  <Button
                    onClick={() => order.forEach((position) => orderCtx.addOrderPosition(position))}
                  >
                    Repeat Order
                  </Button>
                </td>
              )}
            </tr>
          ))
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {status === Status.PENDING && <Spinner />}
      {error && <span>{error}</span>}
      {data && (
        <div className={styles.profile}>
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Position</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(reduceHistory(data)).map(([key, value]) => renderOrder(key, value))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrdersHistory;
