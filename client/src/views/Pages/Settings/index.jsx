import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { authActions } from '../../../core/auth';
import ProfilePage from './Profile';
import SecurityPage from './Security';

const Column = Grid.Column;
const Row = Grid.Row;

class SettingsPage extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    state = { activeItem: '/settings/profile' };

    componentWillMount() {
        this.setDefaultRoute(this.props);
    }

    componentDidMount() {
        this.props.getTokens();
    }

    componentWillReceiveProps(nextProps) {
        this.setDefaultRoute(nextProps);
    }

    setDefaultRoute = (props) => {
        const { location } = props;
        if (location.pathname === '/settings') {
            this.props.history.push('/settings/profile');
        } else {
            this.setState({ activeItem: location.pathname });
        }
    }

    handleItemClick = (e, { name }) => {
        const { match } = this.props;
        this.setState({ activeItem: name });
        this.props.history.push(`${match.url}/${name}`);
    }

    render() {
        const { match } = this.props;
        const { activeItem } = this.state;

        return (
            <Grid>
                <Row>
                    <Column width={ 4 }>
                        <div>
                            <Menu vertical>
                                <Menu.Item name="profile" active={ activeItem === '/settings/profile' } onClick={ this.handleItemClick } />
                                <Menu.Item name="security" active={ activeItem === '/settings/security' } onClick={ this.handleItemClick } />
                            </Menu>
                        </div>
                    </Column>
                    <Column width={ 12 }>
                        <div>
                            <Route exact path={ `${match.url}/profile` } component={ ProfilePage } />
                            <Route exact path={ `${match.url}/security` } component={ SecurityPage } />
                            <Route exact path={ `${match.url}/` } component={ ProfilePage } />
                        </div>
                    </Column>
                </Row>
            </Grid>
        );
    }
}

export default connect(null, authActions)(SettingsPage);
