import React, { Component } from 'react';
import FormInput from '../../components/FormInput'
import styles from './styles.module.scss';

export class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className={styles.Login}>
                <form className={styles.Form}>
                    <fieldset>
                        <legend className={styles.Title}>Login</legend>
                        <FormInput type="email" name="email" value={email} onChange={this.onInputChange}/>
                        <FormInput type="password" name="password" value={password} onChange={this.onInputChange}/>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Login
