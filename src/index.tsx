import ReactDOM from 'react-dom/client';

import App from './App';
import { ModalContextProvider } from './components/store/modal-context';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ModalContextProvider>
    <App />
  </ModalContextProvider>
);
