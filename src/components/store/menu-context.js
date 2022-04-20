import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MENU = [
  { id: 'me1', name: 'Sushi', description: 'Finest fish and veggies', price: 22.99 },
  { id: 'me2', name: 'Schnitzel', description: 'German special', price: 16.5 },
  { id: 'me3', name: 'Barbeque Burger', description: 'American, raw, meaty', price: 12.99 },
  { id: 'me4', name: 'Green Bowl', description: 'Healthy...and green...', price: 18.99 },
];

const MenuContext = React.createContext({ menu: [] });

export const MenuContextProvider = (props) => {
  const [menu, setMenu] = useState([]);
  useEffect(() => setMenu(MENU), []);

  return <MenuContext.Provider value={{ menu: menu }}>{props.children}</MenuContext.Provider>;
};

MenuContextProvider.propTypes = {
  children: PropTypes.node,
};

export default MenuContext;
