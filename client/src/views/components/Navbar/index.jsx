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

    toggleSidebar = () => {
        this.props.onMenuClick();
    }

    render() {
        const { isAuth } = this.props;
        const { activeItem, visible } = this.state;
        return (
            <div>
                <Sticky>
                    <Menu pointing secondary>
                        <Menu.Item name="home" active={ activeItem === 'home' } onClick={ this.handleItemClick } />
                        <Menu.Item name="menu" onClick={ this.toggleSidebar } />
                        <Menu.Menu position="right">
                            <Menu.Item name="logout" active={ activeItem === 'logout' } onClick={ this.handleItemClick } />
                        </Menu.Menu>
                    </Menu>
                </Sticky>
            </div>
        );
    }
}
