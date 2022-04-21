import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const OrderContext = React.createContext({
  positions: [],
  totalAmount: 0,
  totalPrice: 0,
  addOrderPosition: () => {},
  removeOrderPosition: () => {},
});

const DEFAULT_STATE = {
  positions: [],
  totalAmount: 0,
  totalPrice: 0,
};

const orderReducer = (oldOrder, action) => {
  const position = action.position;
  let positions = [...oldOrder.positions];
  const orderedPositionInd = positions.findIndex((item) => item.id === position.id);
  const orderedPosition = positions[orderedPositionInd];

  if (action.type === 'ADD') {
    orderedPosition
      ? (positions[orderedPositionInd] = {
          ...orderedPosition,
          amount: orderedPosition.amount + +position.amount,
        })
      : positions.push({ ...position });
  } else if (action.type === 'REMOVE') {
    orderedPosition?.amount > +position.amount
      ? (positions[orderedPositionInd] = {
          ...orderedPosition,
          amount: orderedPosition.amount - +position.amount,
        })
      : (positions = positions.filter((item) => item.id !== position.id));
  } else {
    return DEFAULT_STATE;
  }

  return {
    positions: positions,
    totalAmount: positions.reduce((total, position) => total + +position.amount, 0),
    totalPrice: positions.reduce((price, position) => price + position.price * +position.amount, 0),
  };
};

export const OrderContextProvider = (props) => {
  const [order, dispatchOrder] = useReducer(orderReducer, DEFAULT_STATE);

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
