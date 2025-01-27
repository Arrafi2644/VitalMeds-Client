import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const usePayments = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data: payments = [], refetch} = useQuery({
        queryKey: [ user?.email,'carts'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })
//    console.log(payments);
    return [payments, refetch]
};

export default usePayments;