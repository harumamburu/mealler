import React, { useReducer } from 'react';
import Order from '../model/Order';

import OrderedMeal from '../model/OrderedMeal';

type OrderContext = {
  positions: OrderedMeal[];
  totalAmount: number;
  totalPrice: number;
  addOrderPosition: (position: OrderedMeal) => void;
  removeOrderPosition: (position: OrderedMeal) => void;
  clearOrder: () => void;
};

const OrderContext = React.createContext<OrderContext>({
  positions: [],
  totalAmount: 0,
  totalPrice: 0,
  addOrderPosition: () => {},
  removeOrderPosition: () => {},
  clearOrder: () => {},
});

const DEFAULT_STATE: Order = {
  positions: [],
  totalAmount: 0,
  totalPrice: 0,
};

enum Action {
  ADD,
  REMOVE,
  CLEAR,
}

const orderReducer = (oldOrder: Order, action: { type: Action; position?: OrderedMeal }) => {
  if (action.position) {
    const position = action.position;
    let positions = [...oldOrder.positions];
    const orderedPositionInd = positions.findIndex((item) => item.id === position.id);
    const orderedPosition = positions[orderedPositionInd];

    if (action.type === Action.ADD) {
      orderedPosition
        ? (positions[orderedPositionInd] = {
            ...orderedPosition,
            amount: orderedPosition.amount + +position.amount,
          })
        : positions.push({ ...position });
    } else if (action.type === Action.REMOVE) {
      orderedPosition?.amount > +position.amount
        ? (positions[orderedPositionInd] = {
            ...orderedPosition,
            amount: orderedPosition.amount - +position.amount,
          })
        : (positions = positions.filter((item) => item.id !== position.id));
    }

    return {
      positions: positions,
      totalAmount: positions.reduce((amount, position) => amount + +position.amount, 0),
      totalPrice: positions.reduce(
        (price, position) => price + position.price * +position.amount,
        0
      ),
    };
  }

  // Action.CLEAR or fallback
  return DEFAULT_STATE;
};

export const OrderContextProvider: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const [order, dispatchOrder] = useReducer(orderReducer, DEFAULT_STATE);

  const contextValue: OrderContext = {
    positions: order.positions,
    totalAmount: order.totalAmount,
    totalPrice: order.totalPrice,
    addOrderPosition: (position) => dispatchOrder({ type: Action.ADD, position: position }),
    removeOrderPosition: (position) => dispatchOrder({ type: Action.REMOVE, position: position }),
    clearOrder: () => dispatchOrder({ type: Action.CLEAR }),
  };

  return <OrderContext.Provider value={contextValue}>{props.children}</OrderContext.Provider>;
};

export default OrderContext;
