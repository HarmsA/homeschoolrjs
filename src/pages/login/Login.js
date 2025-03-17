import React, {useState} from 'react';
import styles from "../signup/signup.module.css";
import {useLogin} from "../../hooks/useLogin";

const Login = () => {
    const {login, error, isPending} = useLogin()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
        setEmail('')
        setPassword('')
    }

    return (
        <form className={styles['auth-form']} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete='current-password'
                />
            </label>
            {!isPending && <button className="btn">Log in</button>}
            {isPending && <button className="btn" disabled>Logging in...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default Login;
