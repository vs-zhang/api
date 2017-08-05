import { Record } from 'immutable';
import {
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
    case LOGIN_SUCCESS:
        console.log(payload);
        return state.merge({
            authenticated: !!payload,
            id: payload ? payload.uid : null,
            email: payload ? payload.email : null,
            username: payload ? payload.displayName : null,
        });
    default:
        return state;
    }
}
