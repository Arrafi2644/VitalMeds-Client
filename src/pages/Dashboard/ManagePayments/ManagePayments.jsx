import React from 'react';
import usePayments from '../../../hooks/usePayments';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManagePayments = () => {
    const axiosSecure = useAxiosSecure()
    const [payments, refetch] = usePayments()
    console.log(payments);

    const handlePayment = (payment) => {
        console.log(payment);
        
        axiosSecure.patch(`/payments/${payment._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                toast.success("Payment accepted.")
                refetch();
            }
            
        })
        .catch(err =>{
           console.log(err);
           toast.error("Something went wrong! Please try again.")
        })

    }
    return (
        <div className='my-8'>
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
                                         <th>Payment status</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
        
                                    {
                                        payments.map((payment, index) => <tr key={payment._id}>
                                            <td>{index + 1}</td>
                                            <td>${payment.price}</td>
                                            <td>{payment.transactionId}</td>
                                            <td>
                                                {payment.status}
                                                {
                                                    payment.status === "pending" && <button onClick={()=>handlePayment(payment)} className="btn btn-xs bg-primary hover:bg-secondary ml-2">Accept Payment</button>
                                                }
                                                </td>
                                             
                                         
                                        </tr>)
                                    }
        
                                </tbody>
                            </table>
                        </div>
                    </div>
        
                    <Helmet>
                        <title>VitalMeds | Dashboard | Payment Management </title>
        
                    </Helmet>
                </div>
    );
};

export default ManagePayments;