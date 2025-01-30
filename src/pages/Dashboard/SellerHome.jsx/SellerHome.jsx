import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import usePayments from '../../../hooks/usePayments';

const SellerHome = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    // const [payments, refetch] = usePayments();
    // console.log(payments);

    const {data: totals} = useQuery({
        queryKey: ['total'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments/seller/summary/${user?.email}`)
            return res.data
        }
    })

    console.log(totals);


    return (
        <div className=''>
        <h2 className='text-3xl font-bold '>Total Sales Revenue</h2>
           <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat flex gap-2">
                <div>
                    <div className="stat-value text-3xl">${totals?.totalPaid}</div>
                    <div className="stat-title ">Paid Total</div>
                </div>
            </div>

            <div className="stat flex gap-4">
                <div>
                    <div className="stat-value text-3xl">${totals?.totalPending}</div>
                    <div className="stat-title">Pending Total</div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default SellerHome;