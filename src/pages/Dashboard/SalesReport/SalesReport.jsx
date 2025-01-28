import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { space } from 'postcss/lib/list';

const SalesReport = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    // const [payments, refetch] = usePayments()

    const { data: payments = [], refetch } = useQuery({
        queryKey: [user?.email, 'payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/admin/${user?.email}`)
            return res.data
        }
    })

    // console.log(payments);

    return (
        <div className=''>
            <div className='flex gap-2 flex-col md:flex-row justify-between'>
                <h2 className='text-3xl font-bold '>Sales Report: {payments.length}</h2>

            </div>
            <div className='mt-6'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='border'>
                                <th>Sl.</th>
                                <th>Medicine Name</th>
                                <th>Total Price</th>
                                <th>Transaction Id</th>
                                <th>Buyer Email</th>
                                <th>Seller Email</th>
                                <th>Payment status</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                payments.map((payment, index) => <tr className='border' key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.medicineName.map((medicine, index) => <span key={index}>{medicine} </span> )}</td>
                                    <td>${payment.price}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.email}</td>
                                    <td>{payment.sellersEmail.map((seller, index) => <span key={index}>{seller} </span> )}</td>
                                    <td>{payment.status}</td>
                                    <td>{new Date(payment.date).toString()}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <Helmet>
                <title>VitalMeds | Dashboard | Sales Report </title>

            </Helmet>
        </div>
    );
};


export default SalesReport;