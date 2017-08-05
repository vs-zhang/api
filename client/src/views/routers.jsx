import React from 'react';
import { Route, Switch } from 'react-router';
import { HomePage, LoginPage, SignupPage } from './Pages';

const routes = (
    <Switch>
        <Route path="/signup" component={ SignupPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/" component={ HomePage } />
    </Switch>
);

export default routes;
