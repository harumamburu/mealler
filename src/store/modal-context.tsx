import React, { useState } from 'react';

const MODALS = { cart: false, checkout: false, signin: false, orderDone: false };

type ModalContext = {
  modals: typeof MODALS;
  zIndex: number;
  setModal: (modalKey: string, isActive: boolean) => void;
};

const ModalContext = React.createContext<ModalContext>({
  modals: {} as typeof MODALS,
  zIndex: 0,
  setModal: () => {},
});

export const ModalContextProvider: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const [modals, setModals] = useState(MODALS);
  const [zIndex, setZIndex] = useState(0);

  const modalStateHandler = (modalKey: string, isActive: boolean) => {
    setZIndex((oldIndex) => {
      return isActive ? oldIndex + 20 : oldIndex - 20;
    });
    setModals((oldModals) => {
      const modals = { ...oldModals };
      if (modals.hasOwnProperty(modalKey)) {
        modals[modalKey as keyof typeof MODALS] = isActive;
      }
      return modals;
    });
  };

  const contextValue: ModalContext = { modals: modals, zIndex, setModal: modalStateHandler };
  return <ModalContext.Provider value={contextValue}>{props.children}</ModalContext.Provider>;
};

export default ModalContext;
