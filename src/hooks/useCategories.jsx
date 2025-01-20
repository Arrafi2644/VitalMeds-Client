import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {

    const axiosSecure = useAxiosSecure()

    const {data:categories = [], refetch} = useQuery({
            queryKey: ['category'],
            queryFn: async()=>{
                const res = await axiosSecure.get(`/categories`)
                return res.data;
            }
        })

    return [categories, refetch]
};

export default useCategories;