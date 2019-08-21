import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../components/FormInput';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom'

import { register } from '../../actions/auth';

import styles from './styles.module.scss';

export class SignUp extends Component {
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

		this.props.register({
			email,
			password
		});
	}

	render() {
		const { email, password } = this.state;
		const { errors, isLoading } = this.props;
		return (
			<div className={styles.SignUp}>
				<form className={styles.Form} onSubmit={this.onSubmit}>
					<fieldset disabled={isLoading}>
						<legend className={styles.Title}>SignUp</legend>
						{errors.signup && <div className={classnames([styles.Error, 'error'])}>{errors.signup}</div>}
						<FormInput type="email" name="email" value={email} onChange={this.onInputChange} required/>
						<FormInput type="password" name="password" value={password} onChange={this.onInputChange} required/>
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
	errors: state.errors
});

const mapDispatchToProps = {
	register
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));