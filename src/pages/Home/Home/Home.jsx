import React from 'react';
import Banner from '../Banner/Banner';
import CategorySection from '../../../components/CategorySection/CategorySection/CategorySection';
import DiscountSection from '../../../components/DiscountSection/DiscountSection';
import BlogSection from '../../../components/BlogSection/BlogSection';
import StateSection from '../../../components/StateSection/StateSection';
import { Helmet } from 'react-helmet-async';
import LatestMedicines from '../../../components/LatestMedicines/LatestMedicines';
import usePostedAdvertisements from '../../../hooks/usePostedAdvertisements';

const Home = () => {
    const [advertises, isLoading] = usePostedAdvertisements()
    return (
        isLoading ?
            <div className='flex items-center justify-center'>
                <span className="loading loading-spinner loading-xl mt-12"></span>
            </div>
            :

            <div className='container mx-auto px-4'>
                <Banner></Banner>
                <CategorySection></CategorySection>
                <DiscountSection></DiscountSection>
                <LatestMedicines></LatestMedicines>
                <StateSection></StateSection>
                <BlogSection></BlogSection>

                <Helmet>
                    <title>VitalMeds | Home</title>

                </Helmet>
            </div>
    );
};

export default Home;