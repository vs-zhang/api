import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './layout';

const routes = (
    <Switch>
        <Route path="/" component={Layout} />
    </Switch>
);

export default routes;
