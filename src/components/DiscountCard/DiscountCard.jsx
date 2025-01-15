import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

const DiscountCard = () => {
    return (
        <div className='p-4 shadow-md bg-background'>
        <div className='border p-4 rounded-md' >
        <img src="https://i.ibb.co.com/yqhCBgz/image.png" alt="" />
        </div>
        <div>
            <h3>Napa Extend 625mg.</h3>
            <p>14 Tablets</p>
            <p className='flex items-center'>MRP <del><span className='flex items-center '><TbCurrencyTaka></TbCurrencyTaka> 30</span></del></p>
            <p className='flex items-center font-bold gap-1'><span className='flex items-center '><TbCurrencyTaka></TbCurrencyTaka> 30</span> <span className='text-primary font-bold'>(10%)</span></p>
        </div>
    </div>
    );
};

export default DiscountCard;