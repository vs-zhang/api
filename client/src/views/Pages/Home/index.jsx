import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { isAuthenticated, getAuth, authActions } from '../../../core/auth';

class HomePage extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                Home
                <div>
                    <Link to="/settings/profile">Settings</Link>
                </div>
                <div>
                    { user.email }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
  isAuthenticated,
  getAuth,
  (isAuth, user) => ({ isAuth, user })
);

export default connect(mapStateToProps, authActions)(HomePage);
