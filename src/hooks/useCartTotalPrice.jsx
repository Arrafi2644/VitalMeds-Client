import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCartTotalPrice = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data: totalPrice, refetch} = useQuery({
        queryKey: [user.email, "total"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/carts/totalPrice/${user.email}`)
            // console.log(res.data[0].grandTotal);
            return res.data[0].grandTotal;
        }
    })
    return [totalPrice, refetch]
};

export default useCartTotalPrice;