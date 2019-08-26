import axios from 'axios';
import moment from 'moment';
import {
    GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, GET_PRODUCTS_REVIEWS, GET_PRODUCTS_REVIEWS_SUCCESS,
    GET_PRODUCTS_REVIEWS_ERROR, SET_PRODUCT_REVIEW, SET_PRODUCT_REVIEW_ERROR, SET_PRODUCT_REVIEW_SUCCESS
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

export const setProductReview = (productId, username, reviewData) => async dispatch => {
    try {
        dispatch({ type: SET_PRODUCT_REVIEW });
        const { data } = await axios.post(`/reviews/${productId}`, reviewData);
        if (data.success) {
            dispatch({
                type: SET_PRODUCT_REVIEW_SUCCESS,
                data: {
                    id: Math.floor(Math.random() * 999999),
                    product: productId,
                    rate: reviewData.rate,
                    text: reviewData.text,
                    created_by: {
                        id: Math.floor(Math.random() * 999999),
                        username,
                    },
                    created_at: moment().toISOString()
                }
            });
        }

    } catch (error) {
        handleError({
            type: SET_PRODUCT_REVIEW_ERROR,
            error,
            dispatch
        });
    }
}