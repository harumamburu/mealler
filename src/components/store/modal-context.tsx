import React, { useState } from 'react';

const MODALS = { cart: false };

type ModalContext = {
  modals: typeof MODALS;
  setModal: (modalKey: string, isActive: boolean) => void;
};

const ModalContext = React.createContext<ModalContext>({
  modals: {} as typeof MODALS,
  setModal: () => {},
});

export const ModalContextProvider: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const [modals, setModals] = useState(MODALS);

  const modalStateHandler = (modalKey: string, isActive: boolean) =>
    setModals((oldModals) => {
      const modals = { ...oldModals };
      if (modals.hasOwnProperty(modalKey)) {
        modals[modalKey as keyof typeof MODALS] = isActive;
      }
      return modals;
    });

  const contextValue: ModalContext = { modals: modals, setModal: modalStateHandler };
  return <ModalContext.Provider value={contextValue}>{props.children}</ModalContext.Provider>;
};

export default ModalContext;
