import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types';

import styles from './styles.module.scss'

const Header = ({ isAuthenticated, logout }) => {
    return (
        <header className={styles.Header}>
            {!isAuthenticated ?
                <>
                    <button className={styles.HeaderBtn}><Link to="/login">Login</Link></button>
                    <button className={styles.HeaderBtn}><Link to="/register">Sign Up</Link></button>
                </> : (
                    <button className={styles.HeaderBtn} onClick={logout}>Logout</button>
                )
            }
        </header>
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps, { logout })(Header)
