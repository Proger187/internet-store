import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStorage from './storage/UserStorage';
import CartStorage from './storage/CartStorage';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null)
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStorage(),
        cart: new CartStorage()
      }}
    >
          <App />
    </Context.Provider>
  </React.StrictMode>
);
