import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaJediOrder, FaTrashAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import CartCard from '../../../components/CartCard/CartCard';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import useCartTotalPrice from '../../../hooks/useCartTotalPrice';

const Cart = () => {
    const [carts, refetch] = useCart()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [totalPrice] = useCartTotalPrice()

        const handleDeleteAll = (product) => {
            // console.log(product);
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
                    axiosSecure.delete(`/carts/clearAll/${user.email}`)
                        .then(res => {
                            // console.log(res);
                            if (res.data.deletedCount > 0) {
                                // console.log(totalPriceRefetch);
                                
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "All cart products has been deleted.",
                                    icon: "success"
                                });
                                refetch()
                                
                            }
    
                        })
                        .catch(err => {
                            // console.log(err);
                            Swal.fire({
                                title: "Error!",
                                text: "Something went wrong! Try again.",
                                icon: "error"
                            });
                        })
                }
            });
        }

        const orderInfo = {
            carts: carts,
            totalPrice: totalPrice
        }
        console.log("order info ", orderInfo);

    return (
        <div className=' mt-8 px-4 container mx-auto'>
            <div className='flex justify-between gap-2 flex-col md:flex-row'>
                <h2 className='text-3xl font-bold'>Total cart: {carts.length}</h2>
                <div className='flex items-center gap-2'>
                <h3 className='text-xl font-bold'>Total Price: {totalPrice}</h3>
                {carts.length > 0 && <Link state={orderInfo} to='/checkout' className="btn bg-primary hover:bg-secondary">Checkout</Link>}
                {carts.length < 1 && <button disabled className="btn bg-primary hover:bg-secondary">Checkout</button>}
            

                <button disabled={carts?.length <= 0} onClick={handleDeleteAll} className="btn flex items-center gap-1 bg-white btn-outline hover:bg-red-500">Clear All <FaTrashAlt></FaTrashAlt></button>
                </div>
            </div>
            {
                carts?.length <= 0 ? <h2 className='text-center font-semibold text-lg mt-10'>No cart item </h2> : 
                <div className='mt-6 grid grid-cols-2 gap-4'>
                {
                    carts.map(cart => <CartCard key={cart._id} cart={cart}></CartCard>)
                }
            </div>
            }
            <Helmet>
                <title>VitalMeds | Cart</title>

            </Helmet>
        </div>
    );
};

export default Cart;