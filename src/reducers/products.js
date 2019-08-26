import {
    GET_PRODUCTS,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_REVIEWS,
    GET_PRODUCTS_REVIEWS_ERROR,
    GET_PRODUCTS_REVIEWS_SUCCESS,
    SET_PRODUCT_REVIEW,
    SET_PRODUCT_REVIEW_ERROR,
    SET_PRODUCT_REVIEW_SUCCESS
} from '../actions/types';
import { combineReducers } from 'redux'

const productsInitialState = {
    isLoading: false,
    data: []
}

const productsList = (state = productsInitialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                isLoading: true
            }

        case GET_PRODUCTS_SUCCESS: {
            return {
                isLoading: false,
                data: action.data
            }
        }

        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

const reviewsInitialState = {
    isLoading: false,
    data: []
}

const productReviews = (state = reviewsInitialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REVIEWS:
        case SET_PRODUCT_REVIEW:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCTS_REVIEWS_SUCCESS: {
            return {
                isLoading: false,
                data: action.data
            }
        }
        case SET_PRODUCT_REVIEW_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.data]
            }
        }
        case GET_PRODUCTS_REVIEWS_ERROR:
        case SET_PRODUCT_REVIEW_ERROR:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default combineReducers({
    productsList,
    productReviews
});