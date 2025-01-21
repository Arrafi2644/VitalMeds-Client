import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useAdvertisementsBySeller = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

   const {data: advertisements=[], refetch} =  useQuery({
    queryKey : [user.email, 'advertisement'],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/advertisements/${user.email}`)
        return res.data;
    }
   })


    return [advertisements, refetch];
};

export default useAdvertisementsBySeller;