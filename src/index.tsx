import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { GlobalStyles } from './styles/globalStyles'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />  {/* Aplicando estilos globais */}
      <App />
    </Provider>
  </React.StrictMode>
);
