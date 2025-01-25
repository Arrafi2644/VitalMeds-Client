import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import useCart from '../../hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCartTotalPrice from '../../hooks/useCartTotalPrice';


const CartCard = ({ cart }) => {
    const [carts, refetch] = useCart();
    const [quantity, setQuantity] = useState(1);
    const axiosSecure = useAxiosSecure();
    const [totalPrice, totalPriceRefetch] = useCartTotalPrice()
    
    const handleIncrement = (cart) => {
        console.log("increment cart", cart);
        axiosSecure.patch(`/carts/increment/${cart._id}`)
        .then(res => {
            console.log(res);
            refetch()
            totalPriceRefetch()
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleDecrement = (cart) => {
        if(cart.quantity > 1){
            axiosSecure.patch(`/carts/decrement/${cart._id}`)
            .then(res => {
                console.log(res);
                refetch()
                totalPriceRefetch()
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            return toast.error("You cannot decrease less than 1")
        }
    }
    
    const handleDelete = (product) => {
        console.log(product);
        Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/carts/${product._id}`)
                        .then(res => {
                            console.log(res);
                            if (res.data.deletedCount > 0) {
                                refetch()
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Medicine has been deleted.",
                                    icon: "success"
                                });
                                refetch();
                                totalPriceRefetch()
                            }
    
                        })
                        .catch(err => {
                            console.log(err);
                            Swal.fire({
                                title: "Error!",
                                text: "Something went wrong! Try again.",
                                icon: "error"
                            });
                        })
                }
            });
        }


        
    return (
        <div className='flex flex-col md:flex-row gap-4 shadow-md p-4'>
            <div>
                <img className='w-40 h-40 border p-4 object-cover rounded-md' src={cart.image} alt="" />

            </div>
            <div className='w-full flex flex-col'>
                <div className='grow'>
                    <div className='flex justify-between w-full'>
                        <h3 className='text-xl font-semibold'>{cart.name}</h3>
                        <p className='flex items-center text-lg'><TbCurrencyTaka></TbCurrencyTaka> {cart.price}/<span className=''>unit</span></p>
                    </div>
                    <div className='flex justify-between gap-6'>
                        <p className='text-sm'>{cart.power}
                            {cart.massUnit}</p>

                    </div>
                    <div>
                        <p className=''> {cart.company}</p>
                    </div>
                </div>

                <div className='flex justify-between gap-2 items-end justify-items-end bottom-0'>
                    <div className='flex '>
                        <span className='border p-2 border-primary'>{cart.quantity}</span>
                        <div className="join join-vertical rounded-l-none border-primary">
                            <button onClick={()=>handleIncrement(cart)} className="btn join-item btn-xs text-base btn-outline border-primary">+</button>
                            <button onClick={()=>handleDecrement(cart)} className="btn join-item btn-xs text-base btn-outline border-primary">-</button>
                        </div>
                    </div>
                    <div className='flex justify-between gap-2'>
                        <button className="btn btn-sm">Place order</button>
                        <button onClick={()=>handleDelete(cart)} className="btn btn-sm flex gap-2 items-center"><FaTrashAlt></FaTrashAlt></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;