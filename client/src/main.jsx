import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';

const root = document.getElementById('app');

function render() {
    ReactDOM.render(<App />, root);
}

render();

if (module.hot) {
    module.hot.accept('./views/App', () => {
        /* eslint-disable global-require */
        const NewRoot = require('./views/App').default;
        /* eslint-enable global-require */
        ReactDOM.render(<NewRoot />, root);
    });
}
