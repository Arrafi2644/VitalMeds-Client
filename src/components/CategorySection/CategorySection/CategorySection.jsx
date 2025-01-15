import React from 'react';
import SectionHeading from '../../SectionHeading/SectionHeading';
import { Link } from 'react-router-dom';

const CategorySection = () => {
    return (
        <div className='my-12 md:my-16'>
            <SectionHeading></SectionHeading>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2'>
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>  
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>
                <Link className='text-center'>
                    <img className='w-full object-cover' src="https://i.ibb.co.com/ZMR0Twt/capsules-1079838-1280.jpg" alt="" />
                    <h2 className='font-medium'>Capsule</h2>
                </Link>



            </div>
        </div>
    );
};

export default CategorySection;