import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Star from './Star';
import range from 'lodash/range';
import classnames from 'classnames';

import StarIcon from '../../assets/icons/star-regular.svg';


import styles from './styles.module.scss'

const Rate = ({ maxRate = 5, currentRate = 0, disabled = false, onClickHandler }) => {
    const [hoverValue, setHoverValue] = useState(currentRate);
    const onHover = (ind) => {
        setHoverValue(ind)
    }

    const onMouseOut = () => setHoverValue(currentRate);

    return (
        <div className={styles.Rate}>
            {
                range(1, maxRate + 1).map(rate => (
                    <Star disabled={disabled} key={rate} index={rate} onHover={onHover} onMouseOut={onMouseOut} onClick={onClickHandler} value={hoverValue} />
                ))
            }
        </div>
    )
}

Rate.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    maxRate: PropTypes.number,
    disabled: PropTypes.bool,
    currentRate: PropTypes.number.isRequired
}

export default Rate
