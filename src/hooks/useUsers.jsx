import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const axiosSecure = useAxiosSecure();

   const {data: users=[], refetch, isLoading} = useQuery({
    queryKey: ['users'],
    queryFn: async()=> {
        const res = await axiosSecure.get('/users')
        return res.data;
    }
   })

//    console.log(data);

    return [users, refetch, isLoading]
};

export default useUsers;