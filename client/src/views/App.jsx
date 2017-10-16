import React, { Component, PropTypes } from 'react';
import 'semantic-ui-css/semantic.min.css';
import MainRouter from './routers';
import './styles/app.css';

export default class App extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    render() {
        const { history } = this.props;

        const mainApp = (
            <MainRouter history={ history } />
        );

        return (
            <div>
                { mainApp }
            </div>
        );
    }
}
