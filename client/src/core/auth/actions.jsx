import * as axios from 'axios';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import {
    LOGIN_SUCCESS,
    SIGN_UP_SUCCESS,
} from './action-types';

const apiHost = 'http://api.dev.com';

function setAuthCookies(userData) {
    const { access_token, refresh_token } = userData;
    const cookies = new Cookies();
    cookies.set('access_token', access_token);
    cookies.set('refresh_token', refresh_token);
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

export function initLoggedIn(userData) {
    return dispatch => dispatch(signInSuccess(userData));
}

export function login(username, password) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post(`${apiHost}/oauth/token`, { username, password, grant_type: 'password' }, { headers, withCredentials: true })
            .then((res) => {
                const { data } = res;
                setAuthCookies(data);
                const { access_token: accessToken } = data;
                const { sub: user } = jwtDecode(accessToken);
                dispatch(signInSuccess(user));
            });
    };
}

export function reIssueAccessToken(refresh_token) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post(`${apiHost}/oauth/token`, { refresh_token, grant_type: 'refresh_token' }, { headers, withCredentials: true })
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
        axios.post(`${apiHost}/oauth/signup`, { username, password, email }, { headers })
            .then((res) => {
                const { data } = res;
                setAuthCookies(data);
                const { access_token: accessToken } = data;
                const { sub: user } = jwtDecode(accessToken);
                dispatch(signUpSuccess(user));
            });
    };
}
