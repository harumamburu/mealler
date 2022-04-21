import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const OrderContext = React.createContext({
  positions: [],
  totalAmount: 0,
  totalPrice: 0,
  addOrderPosition: () => {},
  removeOrderPosition: () => {},
});

const orderReducer = (oldOrder, action) => {
  const position = action.position;
  let positions = [...oldOrder.positions];
  const orderedPosition = positions.find((item) => item.id === position.id);

  if (action.type === 'ADD') {
    orderedPosition ? (orderedPosition.amount += +position.amount) : positions.push(position);
  } else if (action.type === 'REMOVE') {
    orderedPosition?.amount > +position.amount
      ? (orderedPosition.amount -= +position.amount)
      : (positions = positions.filter((item) => item.id !== position.id));
  }

  return {
    positions: positions,
    totalAmount: positions.reduce((total, position) => total + +position.amount, 0),
    totalPrice: positions.reduce((price, position) => price + position.price * +position.amount, 0),
  };
};

export const OrderContextProvider = (props) => {
  const [order, dispatchOrder] = useReducer(orderReducer, {
    positions: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  return (
    <OrderContext.Provider
      value={{
        positions: order.positions,
        totalAmount: order.totalAmount,
        totalPrice: order.totalPrice,
        addOrderPosition: (position) => dispatchOrder({ type: 'ADD', position: position }),
        removeOrderPosition: (position) => dispatchOrder({ type: 'REMOVE', position: position }),
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

OrderContextProvider.propTypes = {
  children: PropTypes.node,
};

export default OrderContext;
