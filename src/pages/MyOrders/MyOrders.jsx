import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useSales from '../../hooks/useSales';
import useOrders from '../../hooks/useOrders';
import { Helmet } from 'react-helmet-async';

const MyOrders = () => {
    const [orders, isLoading, refetch] = useOrders()
    console.log("orders ", orders);
    return (
        <div className='my-8'>
            <div className='flex gap-2 flex-col md:flex-row justify-between'>
                <h2 className='text-3xl font-bold '>My Orders</h2>

            </div>
            <div className='mt-6'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='border'>
                                <th>Sl.</th>
                                <th>Products</th>
                                <th>Total Price</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                orders?.map((order, index) => <tr className='border-b border-gray-400 justify-start' key={order._id}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='border'>{
                                        order?.cart?.map(product => <li className='list-none flex justify-between'><span>{product?.name}</span> <span>{product?.quantity}</span></li>)
                                    }
                                    </td>
                                    <td className='border'>
                                        {
                                            order?.cart?.reduce((total, product) => {
                                                const itemTotal = product.price * product.quantity;
                                                const discountAmount = product.discount > 0 ? (itemTotal * product.discount) / 100 : 0;
                                                return total + (itemTotal - discountAmount);
                                            }, 0).toFixed(2)
                                        }Tk
                                    </td>
                                    <td className='border'>{order?.status || "N/A"}</td>

                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <Helmet>
                <title>VitalMeds | Dashboard | My Orders </title>

            </Helmet>
        </div>
    );
};

export default MyOrders;