import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';

const root = document.getElementById('root');

function render() {
    ReactDOM.render(<Root />, root);
}

render();

if (module.hot) {
    module.hot.accept('./views/Root', () => {
        /* eslint-disable global-require */
        const NewRoot = require('./views/Root').default;
        /* eslint-enable global-require */
        ReactDOM.render(<NewRoot />, root);
    });
}
