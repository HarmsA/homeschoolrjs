import React, {useState} from 'react';
import {useSignup} from "../../hooks/useSignup";
import styles from './signup.module.css'


const Signup = () => {
    const {error, isPending, signup} = useSignup()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(email, password, displayName, thumbnail)
        signup(email, password, displayName, thumbnail)
        setDisplayName('')
        setPassword('')
        setEmail('')
        thumbnail('')
    }

    const handleFileChange = e => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
        if (!selected){
            setThumbnailError('A file must be selected')
            setThumbnail(null)
            e.target.value  = null
            return
        }
        if (!selected.type.includes('image')){
            setThumbnailError('An image file must be selected')
            setThumbnail(null)
            e.target.value  = null
            return
        }
        if (!selected.size > 500000){
            setThumbnailError('An image file size must be less than 500kb')
            setThumbnail(null)
            e.target.value  = null
            return
        }
        setThumbnailError(null)
        setThumbnail(selected)
        console.log('Thumbnail updated')

    }

    return (
        <form className={styles['auth-form']} onSubmit={handleSubmit}>
            <h2>Signup</h2>
            {error && <div className='error'>{error}</div>}
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
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Thumbnail:</span>
                <input
                    required
                    type="file"
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
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