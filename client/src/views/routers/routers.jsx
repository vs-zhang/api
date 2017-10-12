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
        updateUI: PropTypes.func.isRequired,
        ui: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
        const accessToken = this.state.cookies.get('access_token');
        const refreshToken = this.state.cookies.get('refresh_token');
        if (refreshToken) {
            const { exp, sub: user } = jwtDecode(accessToken);
            if (exp * 1000 < Date.now()) {
                this.props.reIssueAccessToken(refreshToken);
            }
            this.props.initLoggedIn(user);
        }
    }

    clickMe = () => {
        this.props.updateUI({ isSidebarOpen: !this.props.ui.isSidebarOpen });
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
                    <Navbar onMenuClick={ this.clickMe } isAuth={ isAuth } />
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
