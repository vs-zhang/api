import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { isAuthenticated, getAuth, authActions } from '../../../core/auth';

class HomePage extends Component {
    render() {
        const { user } = this.props;
        return (
            <DocumentTitle title="Home">
                <div>
                    Home
                    <div>
                        <Link to="/settings/profile">Settings</Link>
                    </div>
                    <div>
                        { user.email }
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

HomePage.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = createSelector(
  isAuthenticated,
  getAuth,
  (isAuth, user) => ({ isAuth, user })
);

export default connect(mapStateToProps, authActions)(HomePage);
