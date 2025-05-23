import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSales = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: sales, isLoading, refetch} = useQuery({
        queryKey: [user?.email, 'isSeller'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/sales`)
            return res.data;
        }
    })


    return [sales, isLoading, refetch]
};

export default useSales;