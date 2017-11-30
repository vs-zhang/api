import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getAuth, authActions } from '../../../core/auth';

const Column = Grid.Column;
const Row = Grid.Row;

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
        tokens.forEach(token => tokenElements.push(<div key={ token.get('id') }>{ token.get('user_agent') }</div>));
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
