import React from 'react'
import PropTypes from 'prop-types';

import styles from './styles.module.scss'

const FormInput = ({ type = 'text', value, name, placeholer = '', onChange, error, ...rest }) => {
    return (
        <div className={styles.FormInputWrapper}>
            {error && <div className="error">{error}</div>}
            <input {...rest} className={styles.FormInput} type={type} placeholder={placeholer} value={value} name={name} onChange={onChange} />
        </div>
    )
}

FormInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default FormInput
