import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {loading, user} = useAuth();
    const [isAdmin, adminPending] = useAdmin();
    if(loading || adminPending){
        return <span className="loading loading-bars loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
    }
    // console.log(loading);
    if(user && isAdmin){
        return children;
    }
    return (
        <Navigate to='/'></Navigate>
    );
};

export default AdminRoute;