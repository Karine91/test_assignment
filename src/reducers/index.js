import { combineReducers } from 'redux';
import authReducer from './auth';
import prodReducer from './products'

export default combineReducers({
    auth: authReducer,
    products: prodReducer
});