import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useMedicinesBySeller = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data: medicines=[], refetch} = useQuery({
        queryKey: [user.email ,'medicines'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/medicines/${user.email}`)
            return res.data;
        }
    })

    return [medicines, refetch]
};

export default useMedicinesBySeller;