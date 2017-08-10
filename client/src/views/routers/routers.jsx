import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Route, Switch, withRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { HomePage, LoginPage, SignupPage, SettingsPage } from '../Pages';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated, authActions } from '../../core/auth';

class MainRouter extends Component {
    static propTypes = {
        initLoggedIn: PropTypes.func.isRequired,
        isAuth: PropTypes.bool.isRequired,
        history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    }


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cookies: new Cookies(),
        };
    }

    componentWillMount() {
        const access_token = this.state.cookies.get('access_token'); // eslint-disable-line camelcase
        const refresh_token = this.state.cookies.get('refresh_token'); // eslint-disable-line camelcase
        if (refresh_token) { // eslint-disable-line camelcase
            const userData = { access_token, refresh_token };
            console.log(jwtDecode(access_token));
            this.props.initLoggedIn(userData);
        }
    }

    render() {
        const { isAuth, history } = this.props;
        const routes = (
            <Switch>
                <AuthRoute path="/signup" component={ SignupPage } isAuthenticated={ isAuth } />
                <AuthRoute path="/login" component={ LoginPage } isAuthenticated={ isAuth } />
                <PrivateRoute path="/settings" component={ SettingsPage } isAuthenticated={ isAuth || !!this.state.cookies.get('refresh_token') } />
                <Route exact path="/home" component={ HomePage } />
                <Route exact path="/" component={ HomePage } />
            </Switch>
        );
        return (
            <div>
                <ConnectedRouter history={ history }>
                    {routes}
                </ConnectedRouter>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
  isAuthenticated,
  isAuth => ({ isAuth })
);

export default connect(mapStateToProps, authActions)(MainRouter);
