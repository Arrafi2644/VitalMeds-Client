
import SectionHeading from '../SectionHeading/SectionHeading';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const BlogSection = () => {
  
    return (
        <div className='my-12 md:my-16'>
            <SectionHeading title="Health Articles" subtitle="Get up-to-date on our latest health updates"></SectionHeading>

            <>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={false}
                   
                    navigation={true}
                    modules={[ Navigation]}
                    className="mySwiper"

                    breakpoints={{
                        320: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 25,
                        },
                        1024: {
                          slidesPerView: 4,
                          spaceBetween: 30,
                        },
                      }}
                >
                    <SwiperSlide >
                       <div className='p-4 border rounded-md'>
                       <img src="https://i.ibb.co.com/ScC3rgR/healthy-5506822-1280.jpg" alt="" />
                        <div className=''>
                            <h2 className='text-lg font-bold text-[#2f7662]'>Take healthy food, live with healthy</h2>
                            <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
                        
                        </div>
                       </div>
                    </SwiperSlide>

                    <SwiperSlide >
                       <div className='p-4 border rounded-md'>
                       <img src="https://i.ibb.co.com/ScC3rgR/healthy-5506822-1280.jpg" alt="" />
                        <div className=''>
                            <h2 className='text-lg font-bold text-[#2f7662]'>Take healthy food, live with healthy</h2>
                            <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
                        
                        </div>
                       </div>
                    </SwiperSlide>

                    <SwiperSlide >
                       <div className='p-4 border rounded-md'>
                       <img src="https://i.ibb.co.com/ScC3rgR/healthy-5506822-1280.jpg" alt="" />
                        <div className=''>
                            <h2 className='text-lg font-bold text-[#2f7662]'>Take healthy food, live with healthy</h2>
                            <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
                        
                        </div>
                       </div>
                    </SwiperSlide>

                    <SwiperSlide >
                       <div className='p-4 border rounded-md'>
                       <img src="https://i.ibb.co.com/ScC3rgR/healthy-5506822-1280.jpg" alt="" />
                        <div className=''>
                            <h2 className='text-lg font-bold text-[#2f7662]'>Take healthy food, live with healthy</h2>
                            <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
                        
                        </div>
                       </div>
                    </SwiperSlide>

                    <SwiperSlide >
                       <div className='p-4 border rounded-md'>
                       <img src="https://i.ibb.co.com/ScC3rgR/healthy-5506822-1280.jpg" alt="" />
                        <div className=''>
                            <h2 className='text-lg font-bold text-[#2f7662]'>Take healthy food, live with healthy</h2>
                            <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
                        
                        </div>
                       </div>
                    </SwiperSlide>

                    <SwiperSlide >
                       <div className='p-4 border rounded-md'>
                       <img src="https://i.ibb.co.com/ScC3rgR/healthy-5506822-1280.jpg" alt="" />
                        <div className=''>
                            <h2 className='text-lg font-bold text-[#2f7662]'>Take healthy food, live with healthy</h2>
                            <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
                        
                        </div>
                       </div>
                    </SwiperSlide>

                    <SwiperSlide >
                       <div className='p-4 border rounded-md'>
                       <img src="https://i.ibb.co.com/ScC3rgR/healthy-5506822-1280.jpg" alt="" />
                        <div className=''>
                            <h2 className='text-lg font-bold text-[#2f7662]'>Take healthy food, live with healthy</h2>
                            <p>Access a wide range of medicines and health products delivered to your doorstep. Convenience and care, all in one place.</p>
                        
                        </div>
                       </div>
                    </SwiperSlide>
                </Swiper>
            </>

             <div>
                <div>
                    <img src="" alt="" />
                </div>
             </div>
            
        </div>
    );
};

export default BlogSection;