import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const usePostedAdvertisements = () => {
    const axiosPublic = useAxiosPublic();

    const {data: advertises=[]} = useQuery({
        queryKey: ["advertises"],
        queryFn: async()=> {
            const res = await axiosPublic.get('/postedAdvertisements')
            return res.data;
        }
    })
    return [advertises]
};

export default usePostedAdvertisements;