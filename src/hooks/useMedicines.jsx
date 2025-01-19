import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useMedicines = () => {
    const axiosSecure = useAxiosSecure()

    const {data: medicines=[], refetch} = useQuery({
        queryKey: ['medicines'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/medicines')
            return res.data;
        }
    })

    return [medicines, refetch]
};

export default useMedicines;