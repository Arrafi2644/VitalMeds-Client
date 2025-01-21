import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdvertisements = () => {
    const axiosSecure = useAxiosSecure();

   const {data: advertisements=[], refetch} =  useQuery({
    queryKey : [ 'advertisement'],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/advertisements`)
        return res.data;
    }
   })


    return [advertisements, refetch]
};

export default useAdvertisements;