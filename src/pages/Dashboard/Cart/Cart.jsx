import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaJediOrder, FaTrashAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import CartCard from '../../../components/CartCard/CartCard';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [carts, refetch] = useCart()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const totalPrice = carts.reduce((total, item) => total + item.price, 0 )

        const handleDeleteAll = (product) => {
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
                    axiosSecure.delete(`/carts/clearAll/${user.email}`)
                        .then(res => {
                            console.log(res);
                            if (res.data.deletedCount > 0) {
                                refetch()
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "All cart products has been deleted.",
                                    icon: "success"
                                });
                                refetch();
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
        <div className=' mt-8 px-4 container mx-auto'>
            <div className='flex justify-between gap-2 flex-col md:flex-row'>
                <h2 className='text-3xl font-bold'>Total cart: {carts.length}</h2>
                <div className='flex items-center gap-2'>
                <h3>Total Price: {totalPrice}</h3>
                <Link to='/checkout' className="btn bg-primary hover:bg-secondary">Checkout</Link>
                <button onClick={handleDeleteAll} className="btn flex items-center gap-1 bg-white btn-outline hover:bg-red-500">Clear All <FaTrashAlt></FaTrashAlt></button>
                </div>
            </div>
            <div className='mt-6 grid grid-cols-2 gap-4'>
                {
                    carts.map(cart => <CartCard key={cart._id} cart={cart}></CartCard>)
                }
            </div>
            <Helmet>
                <title>VitalMeds | Cart</title>

            </Helmet>
        </div>
    );
};

export default Cart;