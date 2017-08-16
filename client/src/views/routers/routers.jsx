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
import { Navbar, Sidebar } from '../Components';

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
        const access_token = this.state.cookies.get('access_token'); // eslint-disable-line camelcase
        const refresh_token = this.state.cookies.get('refresh_token'); // eslint-disable-line camelcase
        if (refresh_token) { // eslint-disable-line camelcase
            const userData = { access_token, refresh_token };
            const { exp, iat, sub } = jwtDecode(access_token);
            if (exp * 1000 < Date.now()) {
                this.props.reIssueAccessToken(refresh_token);
            }
            this.props.initLoggedIn(userData);
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
            <div>
                <ConnectedRouter history={ history }>
                    <Sidebar isSidebarOpen={ this.props.ui.isSidebarOpen }>
                        <Navbar onMenuClick={ this.clickMe } />
                        <div>
                            {routes}
                        </div>
                    </Sidebar>
                </ConnectedRouter>
            </div>
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
