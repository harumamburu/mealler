import { useContext } from 'react';

import Cart from './components/cart/Cart';
import Greetings from './components/Greetings';
import MealsList from './components/meals/list/MealsList';
import ModalContext from './components/store/modal-context';
import Header from './components/ui/header/Header';
import { WaiterContextProvider } from './components/store/waiter-context';

function App() {
  const modalCtx = useContext(ModalContext);
  return (
    <WaiterContextProvider>
      <Header />
      <Greetings />
      <MealsList />
      {modalCtx.modals.cart && <Cart />}
    </WaiterContextProvider>
  );
}

export default App;
