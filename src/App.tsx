import { useContext } from 'react';

import Cart from './components/cart/Cart';
import Meals from './components/meals/Meals';
import ModalContext from './components/store/modal-context';
import { OrderContextProvider } from './components/store/order-context';
import Header from './components/layout/header/Header';

const App = () => {
  const modalCtx = useContext(ModalContext);
  return (
    <OrderContextProvider>
      <Header />
      <main>
        <Meals />
      </main>
      {modalCtx.modals.cart && <Cart />}
    </OrderContextProvider>
  );
};

export default App;
