import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import routers from './routers';
import './styles/app.css';
import configureStore from '../core/store';
import { Loader } from './Components';

const store = configureStore();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 2000);
    }

    render() {
        const { loading } = this.state;
        const loader = (
            <div className="loader-container">
                <Loader />
            </div>
        );

        const mainApp = (
            <Provider store={store}>
                <BrowserRouter>
                    {routers}
                </BrowserRouter>
            </Provider>
        );

        return (
            <div>
                { loading ? loader : mainApp }
            </div>
        );
    }
}
