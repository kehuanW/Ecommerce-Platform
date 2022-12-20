import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import { store, persistor } from './redux/store';
import { ToastProvider } from 'react-toast-notifications';
// import { Snack } from '../snackbar';


ReactDOM.render(
  // <ToastProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </PersistGate>
  </Provider>,
  // </ToastProvider>
  document.getElementById('root')
);