import * as axios from 'axios';
import {
    LOGIN_SUCCESS,
    SIGN_UP_SUCCESS,
} from './action-types';

function signInSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    };
}

function signUpSuccess(user) {
    return {
        type: SIGN_UP_SUCCESS,
        payload: user
    };
}

export function login(username, password) {
    const config = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic d2ViYXBw'
    };
    return (dispatch) => {
        axios.post('http://localhost:5000/oauth/token', { username, password, type: 'password' }, { headers: config })
            .then(res => dispatch(signInSuccess(res.data)));
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
            .then(res => dispatch(signUpSuccess(res.data)));
    };
}
