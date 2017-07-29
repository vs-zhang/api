import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import routers from './routers';
import './styles/app.css';
import configureStore from '../core/store';

const store = configureStore();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {routers}
                </BrowserRouter>
            </Provider>
        );
    }
}
