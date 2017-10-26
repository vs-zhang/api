import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Menu, Icon, Dropdown } from 'semantic-ui-react';

const UserIcon = styled.span`
    font-size: 20px;
`;

const StyledDropdown = styled(Dropdown)`
    padding: 0;
`;

export default class Navbar extends Component {
    static propTypes = {
        isAuth: PropTypes.bool,
        user: PropTypes.object
    };

    static defaultProps = {
        isAuth: false,
        user: {}
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { isAuth, user } = this.props;
        const { username } = user;
        const trigger = (
            <UserIcon>
                <Icon name="user" />
            </UserIcon>
        );

        const options = [
            {
                key: 'user',
                text: <span>Signed in as <strong>{ username }</strong></span>,
                disabled: true,
            },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
        ];

        const DropdownTrigger = () => (
            <StyledDropdown trigger={ trigger } options={ options } pointing="top left" icon={ null } />
        );

        const logInItem = (
            <Menu.Item name="log In" onClick={ this.handleItemClick } />
        );

        const logAction = isAuth ? <DropdownTrigger /> : logInItem;

        return (
            <div>
                <Menu inverted borderless fixed="top">
                    <Container>
                        <Menu.Item name="home" onClick={ this.handleItemClick } />
                        <Menu.Item position="right" fitted>
                            { logAction }
                        </Menu.Item>
                    </Container>
                </Menu>
            </div>
        );
    }
}
