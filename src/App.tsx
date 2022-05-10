import { useContext } from 'react';

import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Meals from './components/meals/Meals';
import ModalContext from './store/modal-context';
import { OrderContextProvider } from './store/order-context';
import Header from './components/layout/header/Header';
import SignIn from './components/signin/SignIn';

const App = () => {
  const modalCtx = useContext(ModalContext);

  return (
    <OrderContextProvider>
      <Header />
      <main>
        <Meals />
      </main>
      {modalCtx.modals.cart && <Cart />}
      {modalCtx.modals.checkout && <Checkout />}
      {modalCtx.modals.signin && <SignIn />}
    </OrderContextProvider>
  );
};

export default App;
