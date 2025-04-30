import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import './banner.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import usePostedAdvertisements from '../../../hooks/usePostedAdvertisements';


const Banner = () => {
  const [advertises] = usePostedAdvertisements()
  // console.log(advertises);

  return (
    <div className='my-8'>

      <Swiper
        // slidesPerView={2.2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"

        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },  
        }}
      >
        
    
       {
        advertises.map(advertise => <SwiperSlide key={advertise._id} >
          <div className='bg-primary rounded-md p-10 w-full h-80  md:h-72 text-white flex flex-col md:flex-row justify-center items-center gap-2'>
            <img className='w-32 h-32 object-cover rounded-md' src={advertise.image} alt="" />
            <div>
              <h2 className='font-bold text-xl'>{advertise.name}</h2>
              <p>{advertise.description}</p>
            </div>
          </div>
        </SwiperSlide>

        )
       }


      </Swiper>
    </div>
  );
};

export default Banner;