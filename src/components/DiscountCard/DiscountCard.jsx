import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

const DiscountCard = ({medicine}) => {
    return (
        <div className='p-4 shadow-md bg-background'>
        <div className='border p-4 rounded-md' >
        <img src={medicine.image} alt="" />
        </div>
        <div>
            <h3>{medicine.name}</h3>
            <p>1 {medicine.category}</p>
            <p className='flex items-center'>MRP <del><span className='flex items-center '><TbCurrencyTaka></TbCurrencyTaka> {medicine.price}</span></del></p>
            <p className='flex items-center font-bold gap-1'><span className='flex items-center '><TbCurrencyTaka></TbCurrencyTaka> {medicine.price - (( medicine.discount/ 100) * medicine.price)}</span> <span className='text-primary font-bold'>({medicine.discount}%)</span></p>
        </div>
    </div>
    );
};

export default DiscountCard;