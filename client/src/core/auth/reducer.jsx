import { Record } from 'immutable';
import Cookies from 'universal-cookie';
import {
    SIGN_UP_SUCCESS,
    LOGIN_SUCCESS,
    SIGN_OUT_SUCCESS,
    FETCH_TOKENS_SUCCESS
} from './action-types';

export const AuthState = new Record({
    authenticated: !!new Cookies().get('access_token'),
    id: null,
    email: null,
    username: null,
    tokens: null
});

export function authReducer(state = new AuthState(), { payload, type }) {
    switch (type) {
    case SIGN_UP_SUCCESS:
    case LOGIN_SUCCESS:
        return state.merge({
            ...payload,
            authenticated: true,
        });
    case SIGN_OUT_SUCCESS:
        return state.merge(new AuthState());
    case FETCH_TOKENS_SUCCESS:
        return state.merge({ ...payload });
    default:
        return state;
    }
}
