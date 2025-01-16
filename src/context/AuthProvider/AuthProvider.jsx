import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from '../../firebase/firebase.config';

export const AuthContext = createContext({})


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
       setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
    }

    const authInfo = {
        user,
        createUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;