import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { HomePage, LoginPage, SignupPage } from '../Pages';
import AuthRoute from './AuthRoute';
import { isAuthenticated } from '../../core/auth';

class MainRouter extends Component {
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

MainRouter.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = createSelector(
  isAuthenticated,
  isAuth => ({ isAuth })
);

export default connect(mapStateToProps)(MainRouter);
