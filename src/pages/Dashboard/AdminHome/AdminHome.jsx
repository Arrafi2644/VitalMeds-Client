import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: totalPayments=[]} = useQuery({
        queryKey: ["totalPayments"],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/payments/adminHome/${user?.email}`)
            return res.data;
        }
    })

    console.log(totalPayments);
    const paidTotal = totalPayments.find(payment => payment._id  === "paid");
    const pendingTotal = totalPayments.find(payment => payment._id  === "pending");
 
    // console.log(paidTotal);
    // console.log(pendingTotal);

    return (
        <div className='my-8'>
               <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div className="stat flex gap-2">
                    <div>
                        <div className="stat-value">${paidTotal?.totalPrice}</div>
                        <div className="stat-title ">Paid Total</div>
                    </div>
                </div>

                <div className="stat flex gap-4">
                    <div>
                        <div className="stat-value">${pendingTotal?.totalPrice}</div>
                        <div className="stat-title">Pending Total</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;