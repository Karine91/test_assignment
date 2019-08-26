import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGOUT } from './types';
import { setToken } from '../utils';
import { handleError } from './utils';

export const register = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: SIGNUP });
        const { data } = await axios.post('/register/', { username: email, password });
        if (data.success) {
            dispatch({
                type: SIGNUP_SUCCESS,
                data: {
                    user: {
                        email
                    },
                    token: data.token
                }
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ email }));
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
            dispatch({
                type: LOGIN_SUCCESS,
                data: {
                    user: {
                        email
                    },
                    token: data.token
                }
            })
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ email }));
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


export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(false);
    dispatch({ type: LOGOUT });
}