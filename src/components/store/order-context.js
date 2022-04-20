import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const OrderContext = React.createContext({
  order: {},
  addOrderPosition: () => {},
  removeOrderPosition: () => {},
});

export const OrderContextProvider = (props) => {
  const [order, setOrder] = useState({ positions: [], totalAmount: 0, totalPrice: 0 });

  useEffect(() => {
    setOrder((oldOrder) => {
      return {
        ...oldOrder,
        totalAmount: order?.positions?.reduce((total, position) => total + position.amount, 0) || 0,
        totalPrice:
          order?.positions
            ?.map((position) => position.meal.price * position.amount)
            .reduce((oldPrice, newPrice) => oldPrice + newPrice, 0) || 0,
      };
    });
  }, [order.positions]);

  const addPositionHandler = (position, amount) =>
    setOrder((oldOrder) => {
      const positions = [...oldOrder.positions];
      const orderedPosition = positions.find((item) => item.meal.id === position.id);
      orderedPosition
        ? (orderedPosition.amount += +amount)
        : positions.push({ meal: position, amount: +amount });
      return { ...oldOrder, positions: positions };
    });
  const removePositionHandler = (position, amount) =>
    setOrder((oldOrder) => {
      let positions = [...oldOrder.positions];
      const orderedPosition = positions.find((item) => item.meal.id === position.id);
      orderedPosition?.amount > amount
        ? (orderedPosition.amount -= +amount)
        : (positions = positions.filter((item) => item.meal.id !== position.id));
      return { ...oldOrder, positions: positions };
    });

  return (
    <OrderContext.Provider
      value={{
        order: order,
        addOrderPosition: addPositionHandler,
        removeOrderPosition: removePositionHandler,
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
