import axios from 'axios';
import {
    GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, GET_PRODUCTS_REVIEWS, GET_PRODUCTS_REVIEWS_SUCCESS,
    GET_PRODUCTS_REVIEWS_ERROR
} from './types';
import { handleError } from './utils';

export const getProducts = () => async dispatch => {
    try {
        dispatch({ type: GET_PRODUCTS });
        const { data } = await axios.get('/products/');
        dispatch({ type: GET_PRODUCTS_SUCCESS, data });
    } catch (error) {
        handleError({
            type: GET_PRODUCTS_ERROR,
            error,
            dispatch
        });
    }
}

export const getProductsReviews = (productId) => async dispatch => {
    try {
        dispatch({ type: GET_PRODUCTS_REVIEWS });
        const { data } = await axios.get(`/reviews/${productId}`);
        dispatch({ type: GET_PRODUCTS_REVIEWS_SUCCESS, data });
    } catch (error) {
        handleError({
            type: GET_PRODUCTS_REVIEWS_ERROR,
            error,
            dispatch
        });
    }
}