import React, { Component } from 'react';
import FormInput from '../../components/FormInput';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom'
import { login } from '../../actions/auth';

import styles from './styles.module.scss';

export class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/products");
        }
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        this.props.login({
            email,
            password
        });
    }

    render() {
        const { email, password } = this.state;
        const { errors, isLoading } = this.props;
        return (
            <div className={styles.Login}>
                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <fieldset disabled={isLoading}>
                        <legend className={styles.Title}>Login</legend>
                        {errors.login && <div className={classnames([styles.Error, 'error'])}>{errors.login}</div>}
                        <FormInput type="email" name="email" value={email} onChange={this.onInputChange} required />
                        <FormInput type="password" name="password" value={password} onChange={this.onInputChange} required />
                        <button className={styles.Btn}>Submit</button>

                    </fieldset>
                    <div className={styles.Info}>Don't have an account? <Link to="/register">Register</Link></div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    isAuthenticated: !!state.auth.token,
    errors: state.auth.errors
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
