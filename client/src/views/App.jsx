import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ui from 'redux-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Cookies from 'universal-cookie';
import { ConnectedRouter } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import MainRouter from './routers';
import { isAuthenticated, authActions } from '../core/auth';
import { Navbar } from './Components';
import './styles/app.css';

const StyledMain = styled.div`
    padding-top: 40px
`;

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
                    <StyledMain>
                        <Container>
                            <MainRouter history={ history } isAuth={ isAuth } />
                        </Container>
                    </StyledMain>
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
