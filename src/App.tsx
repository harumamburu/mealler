import { Suspense, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthContext from './store/auth-context';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import CheckoutConfirmation from './components/checkout/CheckoutConfirmation';
import Header from './components/layout/header/Header';
import KnownAddresses from './components/profile/addresses/KnownAddresses';
import MenuPage from './components/pages/MenuPage';
import ModalContext from './store/modal-context';
import NotFoundPage from './components/pages/NotFoundPage';
import { OrderContextProvider } from './store/order-context';
import ProfilePage from './components/pages/ProfilePage';
import OrdersHistory from './components/profile/orders/OrdersHistory';
import SignIn from './components/signin/SignIn';
import Spinner from './components/ui/spinner/Spinner';
import UnauthorizedPage from './components/pages/UnauthorizedPage';

const App = () => {
  const modalCtx = useContext(ModalContext);
  const authCtx = useContext(AuthContext);

  return (
    <OrderContextProvider>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/menu" />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route
            path="/profile"
            element={authCtx.userId ? <ProfilePage /> : <Navigate replace to="/401" />}
          >
            <Route path="" element={<Navigate replace to="orders" />} />
            <Route path="orders" element={<OrdersHistory />} />
            <Route path="addresses" element={<KnownAddresses />} />
          </Route>
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="/*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Suspense>
      {modalCtx.modals.cart && <Cart />}
      {modalCtx.modals.checkout && <Checkout />}
      {modalCtx.modals.signin && <SignIn />}
      {modalCtx.modals.orderDone && <CheckoutConfirmation />}
    </OrderContextProvider>
  );
};

export default App;
