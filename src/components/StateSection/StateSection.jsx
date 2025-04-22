import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const StateSection = () => {
    const axiosPublic = useAxiosPublic()
    const {data: stateCount, refetch} = useQuery({
        queryKey: "stateCount",
        queryFn: async()=> {
            const res = await axiosPublic.get('/state')
            return res.data
        }
    })

    console.log(stateCount);
    return (
        <div className='my-8 md:16'>
            <SectionHeading title='Serving You Better: Our Pharmacy Impact' subtitle=''></SectionHeading>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div className="stat flex gap-2">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/r4VMKcR/icons8-user-80.png" alt="" />
                    <div>
                        <div className="stat-value">{stateCount?.totalUser}</div>
                        <div className="stat-title">Registered Users</div>
                    </div>
                </div>

                <div className="stat flex gap-4">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/GCG4Jcn/icons8-delivery-50-1.png" alt="" />
                    <div>
                        <div className="stat-value">{stateCount?.totalOrderDelivered}</div>
                        <div className="stat-title">Orders Delivered</div>
                    </div>
                </div>

                <div className="stat flex gap-2">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/kMHxt4g/icons8-medicine-50-1.png" alt="" />
                    <div>
                        <div className="stat-value">{stateCount?.totalMedicines}</div>
                        <div className="stat-title">Total Medicine Available</div>
                    </div>

                </div>
                <div className="stat flex gap-2">
                    <img className='w-16 h-16 object-cover' src="https://i.ibb.co.com/sg8YYc1/icons8-seller-80.png" alt="" />
                    <div>
                        <div className="stat-value">2</div>
                        <div className="stat-title">Active Seller</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StateSection;