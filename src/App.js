import { useContext } from 'react';
import Cart from './components/cart/Cart';
import Greetings from './components/Greetings';
import MealsList from './components/meals/list/MealsList';
import ModalContext from './components/store/modal-context';
import Header from './components/ui/header/Header';

function App() {
  const modalCtx = useContext(ModalContext);
  return (
    <>
      <Header />
      <Greetings />
      <MealsList />
      {modalCtx.modals.cart && <Cart />}
    </>
  );
}

export default App;
