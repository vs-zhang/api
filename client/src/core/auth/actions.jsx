import * as axios from 'axios';
import Cookies from 'universal-cookie';
import {
    LOGIN_SUCCESS,
    SIGN_UP_SUCCESS,
} from './action-types';

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
    const config = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post('http://localhost:5000/oauth/token', { username, password, type: 'password' }, { headers: config })
            .then((res) => {
                setAuthCookies(res.data);
                dispatch(signInSuccess(res.data));
            });
    };
}

export function signup(username, email, password) {
    const config = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post('http://localhost:5000/signup', { username, password, email }, { headers: config })
            .then((res) => {
                setAuthCookies(res.data);
                dispatch(signUpSuccess(res.data));
            });
    };
}
