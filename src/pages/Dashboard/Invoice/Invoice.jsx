import React from 'react';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
    const location = useLocation()
    console.log(location);
    const paymentInfo = location.state;
    console.log(paymentInfo);
    console.log(paymentInfo.date);
    const formattedDate = new Date(paymentInfo.date).toLocaleString()
    return (
        <div className='px-4 container mx-auto my-12 md:my-16'>
            <div className='max-w-[600px] space-y-4 h-auto mx-auto bg-primary p-6 rounded-md text-white'>
                <nav className='flex items-center justify-center'>
                    <img className='h-20 w-20 object-cover rounded-full' src="https://i.ibb.co.com/LtqR8jk/logo5-removebg-preview.png" alt="" />
                    
                </nav>
                <div className='text-sm space-y-2'>
                    <p>Payment Amount: ${paymentInfo.price}</p>
                    <p>Transaction Id: {paymentInfo.transactionId}</p>
                    <p>Email: {paymentInfo.email}</p>
                   <p> Product Id: {paymentInfo.cartIds.map(product => <span key={product}>{product} | </span>)}</p>
                   <p>Date & Time: {formattedDate}</p>
                </div>
                
                <button className="btn bg-secondary text-white">Print</button>
            </div>
        </div>
    );
};

export default Invoice;