import React from 'react';
import './AllUsers.css'
import { useCollection } from '../hooks/useCollection'

const AllUsers = () => {
    const  { error, documents } = useCollection('users')
    return (
        <div className='user-list'>
            {error && <div className="error">{error}</div>}
            {document && document.map(user => {

            })}
        </div>
    );
};

export default AllUsers;