import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';

const StateSection = () => {
    return (
        <div className='my-12 md:16'>
            <SectionHeading title='Why Chose Us' subtitle=''></SectionHeading>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div className="stat flex gap-2">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/r4VMKcR/icons8-user-80.png" alt="" />
                    <div>
                        <div className="stat-value">31K</div>
                        <div className="stat-title">Registered Users</div>
                    </div>
                </div>

                <div className="stat flex gap-4">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/GCG4Jcn/icons8-delivery-50-1.png" alt="" />
                    <div>
                        <div className="stat-value">4,200</div>
                        <div className="stat-title">Orders Delivered</div>
                    </div>
                </div>

                <div className="stat flex gap-2">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/kMHxt4g/icons8-medicine-50-1.png" alt="" />
                    <div>
                        <div className="stat-value">2500</div>
                        <div className="stat-title">Total Medicine Available</div>
                    </div>

                </div>
                <div className="stat flex gap-2">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/sg8YYc1/icons8-seller-80.png" alt="" />
                    <div>
                        <div className="stat-value">700</div>
                        <div className="stat-title">Active Seller</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StateSection;