import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Cookies from 'universal-cookie';
import { HomePage, LoginPage, SignupPage } from '../Pages';
import AuthRoute from './AuthRoute';
import { isAuthenticated, authActions } from '../../core/auth';

class MainRouter extends Component {
    static propTypes = {
        initLoggedIn: PropTypes.func.isRequired,
        isAuth: PropTypes.bool.isRequired,
        history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    }

    componentWillMount() {
        const cookies = new Cookies();
        const access_token = cookies.get('access_token');
        const refresh_token = cookies.get('refresh_token');
        const userData = { access_token, refresh_token };
        this.props.initLoggedIn(userData);
    }

    render() {
        const { isAuth, history } = this.props;
        return (
            <div>
                <ConnectedRouter history={ history }>
                    <Switch>
                        <AuthRoute exact path="/signup" component={ SignupPage } isAuthenticated={ isAuth } />
                        <AuthRoute exact path="/login" component={ LoginPage } isAuthenticated={ isAuth } />
                        <Route exact path="/" component={ HomePage } />
                    </Switch>
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
