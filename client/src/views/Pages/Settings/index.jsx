import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Checkbox, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { authActions } from '../../../core/auth';
import ProfilePage from './Profile';
import SecurityPage from './Security';

const Column = Grid.Column;
const Row = Grid.Row;
const Field = Form.Field;
const Input = Form.Input;

class SettingsPage extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
        history: PropTypes.object.isRequired,   // eslint-disable-line react/forbid-prop-types
        match: PropTypes.object.isRequired,   // eslint-disable-line react/forbid-prop-types
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.location.pathname === '/settings') {
            this.props.history.push('settings/profile');
        }
    }

    render() {
        const { match } = this.props;
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
