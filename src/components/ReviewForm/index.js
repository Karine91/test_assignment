import React, { useState } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import Rate from '../Rate';
import FormInput from '../FormInput';

import styles from './styles.module.scss';

const ReviewForm = ({ productId, username, onSubmitHandler }) => {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const onClickHandler = (index) => {
        setRate(index)
    }

    const onInputChange = (e) => {
        setComment(e.target.value)
    }
    const clearForm = () => {
        setRate(0);
        setComment('');
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const valid = !validator.isEmpty(comment, { ignore_whitespace: true });

        if (valid) {
            setError('');
            onSubmitHandler(productId, username, {
                rate,
                text: comment
            });
            clearForm();
        } else {
            setError('Review field is required');
        }
    }
    return (
        <form onSubmit={onSubmit} className={styles.ReviewForm}>
            <Rate currentRate={rate} onClickHandler={onClickHandler}></Rate>
            <FormInput error={error} placeholer="Type your review..." value={comment} onChange={onInputChange}></FormInput>
            <button>Submit Review</button>
        </form>
    )
}

ReviewForm.propTypes = {
    productId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    onSubmitHandler: PropTypes.func.isRequired
}


export default ReviewForm
