import * as axios from 'axios';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import * as constants from '../../Constants';

import {
    LOGIN_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_OUT_SUCCESS,
    FETCH_TOKENS_SUCCESS,
} from './action-types';

const apiHost = constants.API_HOST;

function setAuthCookies(userData) {
    const { access_token } = userData;
    const cookies = new Cookies();
    cookies.set('access_token', access_token, { secure: true, path: '/' });
}

function signInSuccess(userData) {
    return {
        type: LOGIN_SUCCESS,
        payload: userData
    };
}

function signUpSuccess(userData) {
    return {
        type: SIGN_UP_SUCCESS,
        payload: userData
    };
}

function signOutSuccess() {
    return {
        type: SIGN_OUT_SUCCESS,
        payload: {}
    };
}

function fetchTokensSuccess(tokens) {
    return {
        type: FETCH_TOKENS_SUCCESS,
        payload: tokens
    };
}

export function initLoggedIn(userData) {
    return dispatch => dispatch(signInSuccess(userData));
}

export function getTokens() {
    return (dispatch) => {
        axios.get(`${apiHost}/auth/tokens`, { withCredentials: true })
            .then((res) => {
                dispatch(fetchTokensSuccess(res.data));
            });
    };
}

export function login(username, password) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post(`${apiHost}/auth/token`, { username, password, grant_type: 'password' }, { headers, withCredentials: true })
            .then((res) => {
                const { data } = res;
                setAuthCookies(data);
                const { access_token: accessToken } = data;
                const { sub: user } = jwtDecode(accessToken);
                dispatch(signInSuccess(user));
            });
    };
}

export function logout() {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post(`${apiHost}/auth/logout`, {}, { headers, withCredentials: true })
            .then(() => {
                dispatch(signOutSuccess());
                new Cookies().remove('access_token', { secure: true, path: '/' });
            });
    };
}

export function reIssueAccessToken() {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post(`${apiHost}/auth/token`, { grant_type: 'refresh_token' }, { headers, withCredentials: true })
            .then((res) => {
                const { data } = res;
                setAuthCookies(data);
                const { access_token: accessToken } = data;
                const { sub: user } = jwtDecode(accessToken);
                dispatch(signInSuccess(user));
            });
    };
}

export function signup(username, email, password) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post(`${apiHost}/auth/signup`, { username, password, email }, { headers, withCredentials: true })
            .then((res) => {
                const { data } = res;
                setAuthCookies(data);
                const { access_token: accessToken } = data;
                const { sub: user } = jwtDecode(accessToken);
                dispatch(signUpSuccess(user));
            });
    };
}
