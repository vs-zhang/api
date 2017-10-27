import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Container, Menu, Dropdown, Image } from 'semantic-ui-react';

const NavbarMenu = styled(Menu)`
    height: 50px;
`;

class Navbar extends Component {
    static propTypes = {
        isAuth: PropTypes.bool,
        user: PropTypes.object,
        history: PropTypes.object.isRequired
    };

    static defaultProps = {
        isAuth: false,
        user: {}
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleClickDropdown = (e, data) => {
        this.props.history.push(`/${data.value}`);
    }

    render() {
        const { isAuth, user } = this.props;
        const { username } = user;
        const trigger = (
            <span>
                <Image avatar src={ faker.internet.avatar() } /> { username }
            </span>
        );

        const DropdownTrigger = () => (
            <Dropdown trigger={ trigger } pointing="top left" className="link item">
                <Dropdown.Menu>
                    <Dropdown.Item text="Settings" icon="settings" value="settings" onClick={ this.handleClickDropdown } />
                    <Dropdown.Item text="Sign Out" icon="sign out" />
                </Dropdown.Menu>
            </Dropdown>
        );

        const logInItem = (
            <Menu.Item name="log In">
                <Link to="/login">Login</Link>
            </Menu.Item>
        );

        const logAction = isAuth ? <DropdownTrigger /> : logInItem;

        return (
            <NavbarMenu inverted borderless fixed="top">
                <Container>
                    <Menu.Item name="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>

                    <Menu.Item position="right" fitted>
                        { logAction }
                    </Menu.Item>
                </Container>
            </NavbarMenu>
        );
    }
}

export default withRouter(Navbar);
