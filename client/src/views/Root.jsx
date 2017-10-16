import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import App from './App';
import './styles/app.css';
import reducers from '../core/reducers';
// import { Loader } from './Components';

const history = createHistory();
const store = createStore(
    reducers,
    applyMiddleware(thunk, routerMiddleware(history))
);

if (module.hot) {
    module.hot.accept('../core/reducers', () => {
        /* eslint-disable global-require */
        store.replaceReducer(require('../core/reducers').default);
        /* eslint-enable global-require */
    });
}

export default class Root extends Component {
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
        }, 10);
    }

    render() {
        // const { loading } = this.state;
        // const loader = (
        //     <div className="loader-container">
        //         <Loader />
        //     </div>
        // );
        const mainApp = (
            <Provider store={ store }>
                <App history={ history } />
            </Provider>
        );

        return (
            <div>
                { mainApp }
            </div>
        );
    }
}
