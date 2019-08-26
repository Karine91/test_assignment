import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../components/FormInput';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import validator from 'validator';

import { register } from '../../actions/auth';

import styles from './styles.module.scss';

export class SignUp extends Component {
	state = {
		email: '',
		password: '',
		errors: {
			email: '',
			password: ''
		}
	}

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.history.push("/products");
		}
	}

	onInputChange = (e) => {
		const { name, value } = e.target;
		const errors = {}

		if (name === 'email') {
			const validEmail = validator.isEmail(value);
			if (!validEmail) {
				errors.email = 'Email field is not valid';
			} else {
				errors.email = ''
			}
		}

		if (name === 'password') {
			const validPassword = !validator.isEmpty(value, { ignore_whitespace: true });

			if (!validPassword) {
				errors.password = 'Password field is required';
			} else {
				errors.password = ''
			}
		}

		this.setState((prevState) => ({ errors: { ...prevState.errors, ...errors }, [name]: value }));
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { email, password } = this.state;

		const validEmail = validator.isEmail(email);
		const validPassword = !validator.isEmpty(password, { ignore_whitespace: true });

		if (validEmail && validPassword) {
			this.props.register({
				email,
				password
			});
		} else {
			const errors = {}
			if (!validEmail) {
				errors.email = 'Email field is not valid';
			}
			if (!validPassword) {
				errors.password = 'Password field is required';
			}

			this.setState((prevState) => ({ errors: { ...prevState.errors, ...errors } }));
		}
	}

	render() {
		const { email, password, errors: validationErrors } = this.state;
		const { errors, isLoading } = this.props;
		return (
			<div className={styles.SignUp}>
				<form className={styles.Form} onSubmit={this.onSubmit}>
					<fieldset disabled={isLoading}>
						<legend className={styles.Title}>SignUp</legend>
						{errors.signup && <div className={classnames([styles.Error, 'error'])}>{errors.signup}</div>}
						<FormInput error={validationErrors.email} type="email" name="email" value={email} onChange={this.onInputChange} />
						<FormInput error={validationErrors.password} type="password" name="password" value={password} onChange={this.onInputChange} />
						<button className={styles.Btn}>Submit</button>
					</fieldset>
					<div className={styles.Info}>Already have an account? <Link to="/login">Login</Link></div>
				</form>
			</div>
		)
	}
}

SignUp.propTypes = {
	register: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	isLoading: state.auth.isLoading,
	isAuthenticated: !!state.auth.token,
	errors: state.auth.errors
});

const mapDispatchToProps = {
	register
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));