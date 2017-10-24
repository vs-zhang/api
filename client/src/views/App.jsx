import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ui from 'redux-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Cookies from 'universal-cookie';
import { ConnectedRouter } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import 'semantic-ui-css/semantic.min.css';
import MainRouter from './routers';
import { isAuthenticated, authActions } from '../core/auth';
import { Navbar } from './Components';
import './styles/app.css';

class App extends Component {
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

        const mainApp = (
            <ConnectedRouter history={ history }>
                <div>
                    <Navbar isAuth={ isAuth } />
                    <div>
                        <MainRouter history={ history } />
                    </div>
                </div>
            </ConnectedRouter>
        );

        return (
            <div>
                { mainApp }
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

const connectComponent = connect(mapStateToProps, authActions)(App);
export default ui({ key: 'home', state: uiState })(connectComponent);
