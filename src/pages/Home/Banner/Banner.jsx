import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import bannerBg from '../../../assets/images/slider/slider1.jpg'


const Banner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle?.current?.style?.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

 


    return (
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[ Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide style={{ backgroundImage: `url(https://i.ibb.co/1JbfskB/slider1.jpg)`, backgroundSize: "cover", backgroundPosition: "center", height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className='bg-[#00000062] w-full h-full text-white flex justify-center items-center text-center flex-col gap-2'>
               <h2 className='text-3xl md:text-4xl font-bold text-[#2f7662]'>Your Trusted Online Pharmacy</h2>
               <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
               <button className="btn bg-primary">Shop Now</button>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ backgroundImage: `url(https://i.ibb.co/1JbfskB/slider1.jpg)`, backgroundSize: "cover", backgroundPosition: "center", height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className='bg-[#00000062] w-full h-full text-white flex justify-center items-center text-center flex-col gap-2'>
               <h2 className='text-3xl md:text-4xl font-bold text-[#2f7662]'>Your Trusted Online Pharmacy</h2>
               <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
               <button className="btn bg-primary">Shop Now</button>
            </div>

          </SwiperSlide>
          <SwiperSlide style={{ backgroundImage: `url(https://i.ibb.co/1JbfskB/slider1.jpg)`, backgroundSize: "cover", backgroundPosition: "center", height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className='bg-[#00000062] w-full h-full text-white flex justify-center items-center text-center flex-col gap-2'>
               <h2 className='text-3xl md:text-4xl font-bold text-[#2f7662]'>Your Trusted Online Pharmacy</h2>
               <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
               <button className="btn bg-primary">Shop Now</button>
            </div>
          </SwiperSlide>
        
          <div className="autoplay-progress" slot="container-end">
           
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </>
    );
};

export default Banner;