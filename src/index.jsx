/** @format */

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './redux/store';
import { GlobalStyles } from './components';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ToastContainer pauseOnFocusLoss={false} autoClose={2000} limit={1} style={{ zIndex: 999999 }} />
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </Provider>,
);
