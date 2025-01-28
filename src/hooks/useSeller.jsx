import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useSeller = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isSeller , isPending: sellerPending} = useQuery({
        queryKey: [user?.email, 'isSeller'],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/seller/${user.email}`)
            return res.data;
        }
    })


    return [isSeller, sellerPending]
};

export default useSeller;