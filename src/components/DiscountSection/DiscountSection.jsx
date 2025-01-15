
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbCurrencyTaka } from 'react-icons/tb';
import DiscountCard from '../DiscountCard/DiscountCard';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const DiscountSection = () => {
    return (
        <div className='my-12 md:my-16'>
            <SectionHeading title='Discount Products'
            subtitle='Shop this products with discount'
            ></SectionHeading>
            {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6'> */}
              
            {/* </div> */}

           {/* slider  */}

           <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={false}
        
        navigation={true}
        
        modules={[Pagination, Navigation]}
        className="mySwiper bottom-0"

        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}

      >
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        <SwiperSlide><Link to='/details'><DiscountCard></DiscountCard></Link></SwiperSlide>
        
      </Swiper>


        </div>
    );
};

export default DiscountSection;