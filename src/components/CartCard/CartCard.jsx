import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';

const CartCard = ({ cart }) => {
    console.log(cart);

    const [quantity, setQuantity] = useState(1)

    const handleSetQuantity = (e) => {
        console.log(e.target.value);
        console.log(quantity);
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
                    {/* <div className='flex '>
                        <input name='quantity' type="text" readOnly placeholder="Quantity" defaultValue={value} className="input input-bordered w-12 rounded-r-none border-primary" />
                        <div className="join join-vertical rounded-l-none border-primary">
                            <button onClick={handleIncrement} className="btn join-item btn-xs text-base btn-outline border-primary">+</button>
                            <button onClick={handleDecrement} className="btn join-item btn-xs text-base btn-outline border-primary">-</button>
                        </div>
                    </div> */}
                    <div>
                        <input type="number" value={quantity} onChange={(e) => handleSetQuantity(e)} className='border p-2 w-12' name="quantity" id="" />
                    </div>
                    <div className='flex justify-between gap-2'>
                        <button className="btn btn-sm">Place order</button>
                        <button className="btn btn-sm flex gap-2 items-center"><FaTrashAlt></FaTrashAlt></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;