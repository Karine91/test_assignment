import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PublicRoute from './PublicRoute';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Products from '../pages/Products';



const AppRouter = props => {
    return (
        <Router>

            <Switch>
                <Route exact path="/" component={Products}></Route>
                <PublicRoute path="/login" component={Login}></PublicRoute>
                <PublicRoute path="/register" component={SignUp}></PublicRoute>
            </Switch>
        </Router>
    )
}


export default AppRouter
