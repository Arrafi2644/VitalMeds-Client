import React from 'react';
import Banner from '../Banner/Banner';
import CategorySection from '../../../components/CategorySection/CategorySection/CategorySection';

const Home = () => {
    return (
        <div className='container mx-auto px-4'>
           <Banner></Banner>
           <CategorySection></CategorySection>
        </div>
    );
};

export default Home;