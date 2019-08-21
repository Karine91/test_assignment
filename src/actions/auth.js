import axios from 'axios';
import { GET_ERRORS, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
import { setToken } from '../utils'

export const register = ({email, password}) => async dispatch => {
    try {
        dispatch({ type: SIGNUP });
        const { data } = await axios.post('/api/register/', { username: email, password });
        if(data.success){
          dispatch({ type: SIGNUP_SUCCESS, data: data.token });
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
						dispatch({ type: SIGNUP_ERROR });
            dispatch({ type: GET_ERRORS, payload: { signup: data.message }})   
        }
        
    } catch (error) {
        if (error.response) {
						const err = error.response.data;
						console.log(err);
						return dispatch({ type: GET_ERRORS, payload: { signup: err }}) 
        }
				
				dispatch({ type: SIGNUP_ERROR });
        console.log('Error', error.message);
    }
}

export const login = ({email, password}) => async dispatch => {
    try {
			dispatch({ type: LOGIN });
				const { data } = await axios.post('/api/login/', { username: email, password });
				if(data.success){
					dispatch({ type: LOGIN_SUCCESS, data: data.token })
					localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
						dispatch({ type: LOGIN_ERROR });
            dispatch({ type: GET_ERRORS, payload: { login: data.message }})   
        }
    } catch (error) {
				console.log(error);
				dispatch({ type: LOGIN_ERROR });
				if (error.response) {
					dispatch({ type: GET_ERRORS, payload: { login: error.response.data }})
				}
    }
}


export const logout = () => {
	localStorage.removeItem('token');
	setToken(false);
}