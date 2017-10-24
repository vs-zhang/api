import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Route, Switch } from 'react-router';
import { HomePage, LoginPage, SignupPage, SettingsPage } from '../Pages';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated, authActions } from '../../core/auth';

class MainRouter extends Component {
    static propTypes = {
        isAuth: PropTypes.bool.isRequired,
    }

    render() {
        const { isAuth } = this.props;

        return (
            <Switch>
                <AuthRoute path="/signup" component={ SignupPage } isAuthenticated={ isAuth } />
                <AuthRoute path="/login" component={ LoginPage } isAuthenticated={ isAuth } />
                <PrivateRoute path="/settings" component={ SettingsPage } isAuthenticated={ isAuth } />
                <Route exact path="/home" component={ HomePage } />
                <Route exact path="/" component={ HomePage } />
            </Switch>
        );
    }
}

const mapStateToProps = createSelector(
  isAuthenticated,
  isAuth => ({ isAuth })
);

export default connect(mapStateToProps, authActions)(MainRouter);
