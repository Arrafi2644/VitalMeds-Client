import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useMedicines = (category, search, sort) => {
    const axiosSecure = useAxiosSecure()

    console.log("category", category);
    console.log("search", search);
    console.log("sort", sort);

    const {data: medicines=[], refetch, isLoading} = useQuery({
        queryKey: ['medicines', category, search, sort],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/medicines?category=${category}&search=${search}&sort=${sort}`)
           console.log("medicines ",res.data);
            return res.data;
        }
    })

    return [medicines, refetch, isLoading]
};

export default useMedicines;