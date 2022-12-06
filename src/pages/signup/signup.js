import React, {useState, useEffect} from 'react';
import {useSignup} from "../hooks/useSignup";
import styles from './signup.module.css'


const Signup = () => {
    const {error, isPending, signup} = useSignup()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName)
        signup(email, password, displayName)
        setDisplayName('')
        setPassword('')
        setEmail('')
    }

    return (
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
            <h2>Signup</h2>
            {error && <p>{error}</p>}
            <label>
                <span>Email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            {
                isPending ? <button className='btn' disabled>Loading</button>
                :
                <button className='btn'>SignUp</button>
            }
        </form>
    );
};

export default Signup;