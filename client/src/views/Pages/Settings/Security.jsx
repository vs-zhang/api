import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import parser from 'ua-parser-js';
import { getAuth, authActions } from '../../../core/auth';

const TokenElement = ({ token }) => {
    const userAgent = token.get('user_agent');
    const ua = parser(userAgent);
    const { browser, os } = ua;
    return (
        <div>
            { `${browser.name} ${os.name}` }
        </div>
    );
};

TokenElement.propTypes = {
    token: PropTypes.object.isRequired
};

class SecurityPage extends Component {
    static propTypes = {
        getTokens: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
    }

    componentDidMount() {
        if (!this.props.user.tokens) {
            this.props.getTokens();
        }
    }

    render() {
        const { user } = this.props;
        const { tokens } = user;
        if (!tokens) {
            return null;
        }
        const tokenElements = [];
        tokens.forEach(token => tokenElements.push(
            <TokenElement key={ token.get('id') } token={ token } />
        ));
        return (
            <DocumentTitle title="Security">
                <div>
                    { tokenElements }
                </div>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = createSelector(
  getAuth,
  user => ({ user })
);

export default connect(mapStateToProps, authActions)(SecurityPage);
