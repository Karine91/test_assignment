import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Rate from '../Rate'

const ReviewForm = props => {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');

    const onClickHandler = (index) => {
        setRate(index)
    }
    return (
        <form>
            <Rate currentRate={rate} onClickHandler={onClickHandler}></Rate>
        </form>
    )
}

ReviewForm.propTypes = {

}

export default ReviewForm
