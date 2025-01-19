import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data: carts = [], refetch} = useQuery({
        queryKey: [ user?.email,'carts'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/carts/${user?.email}`)
            return res.data
        }
    })

    return [carts, refetch]
};

export default useCart;