import React from 'react';
import { Provider } from "react-redux";
import { setToken } from './utils';
import { LOGIN_SUCCESS } from './actions/types'

import AppRouter from './routes/AppRouter'

import './styles/App.scss';

import './axios';
import store from "./store";

if (localStorage.token) {
  setToken(localStorage.token);
  store.dispatch({ type: LOGIN_SUCCESS, data: localStorage.token })
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter></AppRouter>
      </div>
    </Provider>
  );
}

export default App;
