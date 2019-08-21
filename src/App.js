import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { setToken } from './utils';
import { LOGIN_SUCCESS } from './actions/types'

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Products from './pages/Products'

import './App.scss';

import './axios';
import store from "./store";

if (localStorage.token) {
  setToken(localStorage.token);
  store.dispatch({type: LOGIN_SUCCESS, data: localStorage.token })
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={SignUp}></Route>
          <Route path="/products" component={Products}></Route>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
