import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
import { setToken } from '../utils';
import { handleError } from './utils';

export const register = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: SIGNUP });
        const { data } = await axios.post('/register/', { username: email, password });
        if (data.success) {
            dispatch({ type: SIGNUP_SUCCESS, data: data.token });
            localStorage.setItem('token', data.token);
            setToken(data.token);
        } else {
            dispatch({ type: SIGNUP_ERROR, payload: data });
        }

    } catch (error) {
        handleError({
            type: SIGNUP_ERROR,
            error,
            dispatch
        });
    }
}

export const login = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: LOGIN });
        const { data } = await axios.post('/login/', { username: email, password });
        if (data.success) {
            dispatch({ type: LOGIN_SUCCESS, data: data.token })
            localStorage.setItem('token', data.token);
            setToken(data.token);
        } else {
            dispatch({ type: LOGIN_ERROR, payload: data })
        }
    } catch (error) {
        handleError({
            type: LOGIN_ERROR,
            error,
            dispatch
        });
    }
}


export const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
}