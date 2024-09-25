import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector((state) => state.auth.user);
    
    return (
        <div>
            
        </div>
    );
};

export default UserProfile;