import PropTypes from 'prop-types';
import React, { useState } from 'react';

const MODALS = { cart: false };
const ModalContext = React.createContext({ modals: {}, setModal: () => {} });

export const ModalContextProvider = (props) => {
  const [modals, setModals] = useState(MODALS);
  const modalStateHandler = (modalKey, isActive) =>
    setModals((oldModals) => {
      const modals = { ...oldModals };
      modals[modalKey] = isActive;
      return modals;
    });

  return (
    <ModalContext.Provider value={{ modals: modals, setModal: modalStateHandler }}>
      {props.children}
    </ModalContext.Provider>
  );
};

ModalContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ModalContext;
