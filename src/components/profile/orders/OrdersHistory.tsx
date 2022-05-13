import { useContext, useEffect } from 'react';

import AuthContext from '../../../store/auth-context';
import { fetchOrders } from '../../../lib/api';
import Spinner from '../../ui/spinner/Spinner';
import useHttp, { Status } from '../../../hooks/use-http';
import SubmittedOrder from '../../../model/SubmittedOrder';

const OrdersHistory = () => {
  const authContext = useContext(AuthContext);
  const { httpCallback, data, error, status } = useHttp(fetchOrders, true);
  useEffect(() => {
    httpCallback(authContext.userId);
  }, [httpCallback]);

  const renderOrder = (order: SubmittedOrder, index: number) => {
    return (
      <li key={`order_${index}`}>
        <span>{`${order.date}: `}</span>
        <span>
          {order.positions.map((position, index) => (
            <p key={`order_${index}_${index}`}>{`x${position.amount} ${position.name}`}</p>
          ))}
        </span>
      </li>
    );
  };

  return (
    <>
      {status === Status.PENDING && <Spinner />}
      {error && <span>{error}</span>}
      {data && <ul>{data.map(renderOrder)}</ul>}
    </>
  );
};

export default OrdersHistory;
