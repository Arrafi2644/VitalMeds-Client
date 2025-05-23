import React from 'react';
import { Helmet } from 'react-helmet-async';
import usePayments from '../../../hooks/usePayments';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const SellerPaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data: payments = [], refetch} = useQuery({
        queryKey: [ user?.email,'payments'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments/seller/${user?.email}`)
            return res.data
        }
    })
    

    // console.log(payments);

    return (
        <div className=''>
        <div className='flex gap-2 flex-col md:flex-row justify-between'>
            <h2 className='text-3xl font-bold '>Total Payments: {payments.length}</h2>

        </div>
        <div className='mt-6'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                            <th>Data & Time</th>
                            <th>Payment status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{new Date(payment.date).toLocaleString()}</td>
                                <td>
                                    {payment.status}
                                </td>


                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>

        <Helmet>
            <title>VitalMeds | Dashboard | Payment History </title>

        </Helmet>
    </div>
    );
};

export default SellerPaymentHistory;