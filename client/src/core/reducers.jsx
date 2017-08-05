import { combineReducers } from 'redux';
import { locationReducer } from './location';
import { heroesReducer } from './heroes';
import { authReducer } from './auth';

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    heroes: heroesReducer,
});
