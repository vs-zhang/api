import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { authActions } from '../../../core/auth';
import ProfilePage from './Profile';
import SecurityPage from './Security';

const Column = Grid.Column;
const Row = Grid.Row;

class SettingsPage extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        getTokens: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.setDefaultRoute(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setDefaultRoute(nextProps);
    }

    setDefaultRoute = (props) => {
        const { location } = props;
        if (location.pathname === '/settings') {
            this.props.history.push('settings/profile');
        }
    }

    render() {
        const { match } = this.props;
        // this.props.getTokens();
        return (
            <Grid columns={ 8 }>
                <Row>
                    <Column>
                        <div>
                            Settings
                        </div>
                        <div>
                            <Route exact path={ `${match.url}/profile` } component={ ProfilePage } />
                            <Route exact path={ `${match.url}/security` } component={ SecurityPage } />
                        </div>
                    </Column>
                </Row>
            </Grid>
        );
    }
}

export default connect(null, authActions)(SettingsPage);
