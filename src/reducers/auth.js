
import { LOGIN_SUCCESS, LOGIN, LOGIN_ERROR, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGOUT } from '../actions/types';

const initialState = {
    isLoading: false,
    token: '',
    user: null,
    errors: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
        case SIGNUP:
            return {
                ...state,
                isLoading: true
            }
        case LOGOUT:
            return initialState;
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                token: action.data.token,
                isLoading: false,
                user: action.data.user
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: {
                    ...state.errors,
                    login: action.payload.message
                }
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                isLoading: false,
                errors: {
                    ...state.errors,
                    signup: action.payload.message
                }
            }
        default:
            return state;
    }
}
