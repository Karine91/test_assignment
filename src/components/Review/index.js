import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';

import Rate from '../Rate'

import styles from './styles.module.scss';

const Review = ({ data: { created_at, created_by: { username }, rate, text } }) => {
    return (
        <div className={styles.ReviewItem}>
            <div className={styles.ReviewTitle}>
                {username} - <span className={styles.ReviewDate}>{moment(created_at).format('DD/MM/YYYY')}</span>
                <Rate currentRate={rate}></Rate>
            </div>
            <div className={styles.ReviewText}>{text}</div>
        </div>
    )
}

Review.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        product: PropTypes.number.isRequired,
        created_by: PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string.isRequired
        }),
        rate: PropTypes.number,
        text: PropTypes.string,
        created_at: PropTypes.string
    })
}

export default Review
