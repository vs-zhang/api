import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Sticky, Sidebar, Segment, Icon, Header, Image } from 'semantic-ui-react';

export default class Navbar extends Component {
    static propTypes = {
        isAuth: PropTypes.bool,
    };

    static defaultProps = {
        isAuth: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home',
            visible: false,
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { isAuth } = this.props;
        const { activeItem } = this.state;
        console.log(isAuth);
        const logOutItem = (
            <Menu.Item name="logout" active={ activeItem === 'logout' } onClick={ this.handleItemClick } />
        );
        const logInItem = (
            <Menu.Item name="log In" active={ activeItem === 'logIn' } onClick={ this.handleItemClick } />
        );
        const logAction = isAuth ? logOutItem : logInItem;
        return (
            <div>
                <Sticky>
                    <Menu pointing secondary>
                        <Menu.Item name="home" active={ activeItem === 'home' } onClick={ this.handleItemClick } />
                        <Menu.Menu position="right">
                            { logAction }
                        </Menu.Menu>
                    </Menu>
                </Sticky>
            </div>
        );
    }
}
