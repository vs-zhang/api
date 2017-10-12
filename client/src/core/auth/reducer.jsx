import { Record } from 'immutable';
import {
    SIGN_UP_SUCCESS,
    LOGIN_SUCCESS,
} from './action-types';

export const AuthState = new Record({
    authenticated: false,
    id: null,
    email: null,
    username: null
});

export function authReducer(state = new AuthState(), { payload, type }) {
    switch (type) {
    case SIGN_UP_SUCCESS:
    case LOGIN_SUCCESS:
        console.log(payload)
        return state.merge({
            ...payload,
            authenticated: !!payload,
        });
    default:
        return state;
    }
}
