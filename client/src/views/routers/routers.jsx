import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import ui from 'redux-ui';
import { HomePage, LoginPage, SignupPage, SettingsPage } from '../Pages';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated, authActions } from '../../core/auth';
import { Navbar } from '../Components';

class MainRouter extends Component {
    static propTypes = {
        initLoggedIn: PropTypes.func.isRequired,
        reIssueAccessToken: PropTypes.func.isRequired,
        isAuth: PropTypes.bool.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cookies: new Cookies(),
        };
    }

    componentWillMount() {
        const accessToken = this.state.cookies.get('access_token');
        if (accessToken) {
            const { exp, sub: user } = jwtDecode(accessToken);
            console.log(exp * 1000);
            console.log(Date.now());
            console.log(user);
            if (exp * 1000 < Date.now()) {
                console.log('re issue access token');
                this.props.reIssueAccessToken();
            } else {
                console.log('valid access token');
                this.props.initLoggedIn(user);
            }
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
            <ConnectedRouter history={ history }>
                <div>
                    <Navbar isAuth={ isAuth } />
                    <div>
                        {routes}
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = createSelector(
  isAuthenticated,
  isAuth => ({ isAuth })
);

const uiState = {
    isSidebarOpen: false
};

const connectComponent = connect(mapStateToProps, authActions)(MainRouter);
export default ui({ key: 'home', state: uiState })(connectComponent);
