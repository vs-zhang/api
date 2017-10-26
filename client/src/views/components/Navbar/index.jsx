import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';

export default class Navbar extends Component {
    static propTypes = {
        isAuth: PropTypes.bool,
    };

    static defaultProps = {
        isAuth: false,
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { isAuth } = this.props;

        const logOutItem = (
            <Menu.Item name="logout" onClick={ this.handleItemClick } />
        );

        const logInItem = (
            <Menu.Item name="log In" onClick={ this.handleItemClick } />
        );

        const logAction = isAuth ? logOutItem : logInItem;

        return (
            <div>
                <Menu inverted fixed="top">
                    <Container>
                        <Menu.Item name="home" onClick={ this.handleItemClick } />
                        <Menu.Menu position="right">
                            { logAction }
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        );
    }
}
