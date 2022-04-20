import { useContext } from 'react';

import Cart from './components/cart/Cart';
import Greetings from './components/Greetings';
import MealsList from './components/meals/list/MealsList';
import { MenuContextProvider } from './components/store/menu-context';
import ModalContext from './components/store/modal-context';
import { OrderContextProvider } from './components/store/order-context';
import Header from './components/header/Header';

function App() {
  const modalCtx = useContext(ModalContext);
  return (
    <OrderContextProvider>
      <Header />
      <Greetings />
      <MenuContextProvider>
        <MealsList />
      </MenuContextProvider>
      {modalCtx.modals.cart && <Cart />}
    </OrderContextProvider>
  );
}

export default App;
