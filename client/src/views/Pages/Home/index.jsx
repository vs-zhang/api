import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div>
                Home
                <div>
                    <Link to="/settings/profile">Settings</Link>
                </div>
            </div>
        );
    }
}

export default HomePage;
