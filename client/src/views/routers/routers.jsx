import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { HomePage, LoginPage, SignupPage, SettingsPage } from '../Pages';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';

const MainRouter = ({ isAuth }) => (
    <Switch>
        <AuthRoute path="/signup" component={ SignupPage } isAuthenticated={ isAuth } />
        <AuthRoute path="/login" component={ LoginPage } isAuthenticated={ isAuth } />
        <PrivateRoute path="/settings" component={ SettingsPage } isAuthenticated={ isAuth } />
        <Route exact path="/home" component={ HomePage } />
        <Route exact path="/" component={ HomePage } />
    </Switch>
);

MainRouter.propTypes = {
    isAuth: PropTypes.bool.isRequired,
};

export default MainRouter;
