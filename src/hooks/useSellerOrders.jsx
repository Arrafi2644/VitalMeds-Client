import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const userSellerOrders = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: orders, isLoading, refetch} = useQuery({
        queryKey: [user?.email, 'orders'],
        queryFn: async() => {
            const res = await axiosSecure.get(`orders/seller/${user?.email}`)
            return res.data;
        }
    })

    return [orders, isLoading, refetch]
};

export default userSellerOrders;