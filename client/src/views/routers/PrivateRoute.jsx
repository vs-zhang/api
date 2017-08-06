import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const renderFunc = props => (
        isAuthenticated ? <Component { ...props } /> : <Redirect to="/home" push />
    );

    return (
        <Route { ...rest } render={ renderFunc } />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
