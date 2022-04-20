import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MENU = [
  { id: 'me1', name: 'Sushi', description: 'Finest fish and veggies', price: 22.99 },
  { id: 'me2', name: 'Schnitzel', description: 'German special', price: 16.5 },
  { id: 'me3', name: 'Barbeque Burger', description: 'American, raw, meaty', price: 12.99 },
  { id: 'me4', name: 'Green Bowl', description: 'Healthy...and green...', price: 18.99 },
];

const WaiterContext = React.createContext({
  menu: [],
  order: {},
  addOrderPosition: () => {},
  removeOrderPosition: () => {},
});

export const WaiterContextProvider = (props) => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState({ positions: [], totalAmount: 0, totalPrice: 0 });

  useEffect(() => setMenu(MENU), []);
  useEffect(() => {
    setOrder({
      ...order,
      totalAmount: order?.positions?.reduce((total, position) => total + position.amount, 0) || 0,
      totalPrice: order?.positions
        ?.map(
          (position) => menu.find((item) => item.id === position.mealId).price * position.amount
        )
        .reduce((prev, curr) => prev + curr, 0),
    });
  }, [order.positions]);

  const addPositionHandler = (mealId, amount) =>
    setOrder((oldOrder) => {
      const positions = [...oldOrder.positions];
      const orderedPosition = positions.find((item) => item.mealId === mealId);
      orderedPosition
        ? (orderedPosition.amount += +amount)
        : positions.push({ mealId: mealId, amount: +amount });
      return { ...oldOrder, positions: positions };
    });
  const removePositionHandler = (mealId, amount) =>
    setOrder((oldOrder) => {
      let positions = [...oldOrder.positions];
      const orderedPosition = positions.find((item) => item.mealId === mealId);
      orderedPosition.amount > amount
        ? (orderedPosition.amount -= +amount)
        : (positions = positions.filter((item) => item.mealId !== mealId));
      return { ...oldOrder, positions: positions };
    });

  return (
    <WaiterContext.Provider
      value={{
        menu: menu,
        order: order,
        addOrderPosition: addPositionHandler,
        removeOrderPosition: removePositionHandler,
      }}
    >
      {props.children}
    </WaiterContext.Provider>
  );
};

WaiterContextProvider.propTypes = {
  children: PropTypes.node,
};

export default WaiterContext;
