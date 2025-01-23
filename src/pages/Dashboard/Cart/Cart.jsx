import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaJediOrder, FaTrashAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import CartCard from '../../../components/CartCard/CartCard';

const Cart = () => {
    const [carts, refetch] = useCart()
    return (
        <div className=' mt-8 px-4 container mx-auto'>
            <div className='flex justify-between gap-2 flex-col md:flex-row'>
                <h2 className='text-3xl font-bold'>Total cart: {carts.length}</h2>
                <div className='flex items-center gap-2'>
                <button className="btn bg-primary hover:bg-secondary">Checkout</button>
                <button className="btn flex items-center gap-1 bg-white btn-outline hover:bg-red-500">Clear All <FaTrashAlt></FaTrashAlt></button>
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