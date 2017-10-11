import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Sticky, Sidebar, Segment, Icon } from 'semantic-ui-react';

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
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { isAuth, children } = this.props;
        const { activeItem } = this.state;
        return (
            <div>
                <Sidebar.Pushable as={ Segment }>
                    <Sidebar as={ Menu } animation="uncover" width="thin" visible={ this.props.isSidebarOpen } icon="labeled" vertical inverted>
                        <Menu.Item name="home">
                            <Icon name="home" />
                            Home
                        </Menu.Item>
                        <Menu.Item name="gamepad">
                            <Icon name="gamepad" />
                            Games
                        </Menu.Item>
                        <Menu.Item name="camera">
                            <Icon name="camera" />
                            Channels
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        { children }
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
