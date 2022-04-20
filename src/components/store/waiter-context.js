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
  order: [],
  addOrderPosition: () => {},
  removeOrderPosition: () => {},
});

export const WaiterContextProvider = (props) => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => setMenu(MENU), []);

  const addPositionHandler = (mealId, amount) =>
    setOrder((oldOrder) => {
      const order = [...oldOrder];
      const orderedPosition = order.find((item) => item.mealId === mealId);
      orderedPosition
        ? (orderedPosition.amount += +amount)
        : order.push({ mealId: mealId, amount: +amount });
      return order;
    });
  const removePositionHandler = (mealId, amount) =>
    setOrder((oldOrder) => {
      let order = [...oldOrder];
      const orderedPosition = order.find((item) => item.mealId === mealId);
      orderedPosition.amount > amount
        ? (orderedPosition.amount -= +amount)
        : (order = order.filter((item) => item.mealId !== mealId));
      return order;
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
