import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const renderFunc = props => (
        isAuthenticated ? <Redirect to="/" push /> : <Component { ...props } />
    );

    return (
        <Route { ...rest } render={ renderFunc } />
    );
};

AuthRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default AuthRoute;
