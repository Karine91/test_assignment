import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './pages/Login'

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Login}></Route>
      </Router>
    </div>
  );
}

export default App;
