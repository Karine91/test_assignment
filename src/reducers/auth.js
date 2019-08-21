
import { LOGIN_SUCCESS, LOGIN, LOGIN_ERROR, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../actions/types';

const initialState = {
    isLoading: false,
    token: ''
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
        case SIGNUP:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                token: action.data,
                isLoading: false
            }
        case LOGIN_ERROR:
        case SIGNUP_ERROR:
            return {
                ...state,
                isLoading: false
            }    
        default:
            return state;
    }
}
