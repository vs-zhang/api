import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as uiReducer } from 'redux-ui';
import { authReducer } from './auth';

export default combineReducers({
    auth: authReducer,
    router: routerReducer,
    ui: uiReducer
});
