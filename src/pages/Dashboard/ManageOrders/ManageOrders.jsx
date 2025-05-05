import React from 'react';
import { Helmet } from 'react-helmet-async';
import userSellerOrders from '../../../hooks/useSellerOrders';
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';


const ManageOrders = () => {
    const [orders, isLoading, refetch] = userSellerOrders()
    const axiosSecure = useAxiosSecure()
    // console.log("orders ", orders);

    const handleDelivered = (_id) => {
        console.log("Make delivered", _id);
        const newStatus = "Delivered"
        axiosSecure.patch(`orders/${_id}`, newStatus)
        .then(res => {
            console.log(res);
            if(res?.data?.modifiedCount > 0){
                toast.success("Products Delivered")
            }
            refetch()
        })
        .catch(err => {
            console.log(err);
            toast.error("Something went wrong! Try again.")
        })

    }

    return (
        <div className='my-8'>
            <div className='flex gap-2 flex-col md:flex-row justify-between'>
                <h2 className='text-3xl font-bold '>Manage Orders</h2>

            </div>
            <div className='mt-6'>
                <div className="overflow-x-auto min-h-screen">
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
                                    <td className='border'>{order?.status || "N/A"}

                                        {
                                            order?.status === "Processing" &&
                                            //    <button className="btn btn-xs ml-4 btn-outline border-none"><BiDotsVertical/></button>
                                            <div className="dropdown ml-4">
                                                <div tabIndex={0} role="button" className="btn btn-xs m-1"><BiDotsVertical/></div>
                                                <ul tabIndex={0} className="dropdown-content z-10 right-0 menu bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm">
                                                    <li onClick={()=>handleDelivered(order._id)} className='border rounded-md'><a>Delivered</a></li>
                                                    {/* <li><a>Item 2</a></li> */}
                                                </ul>
                                            </div>
                                        }
                                    </td>


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

export default ManageOrders;