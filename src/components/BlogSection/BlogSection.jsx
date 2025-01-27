
import SectionHeading from '../SectionHeading/SectionHeading';
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const BlogSection = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(()=>{
        fetch('blogs.json')
        .then(res => res.json())
        .then(data => setBlogs(data))
    }, [])

    console.log(blogs);
  
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

                    {
                        blogs.map(blog =>  <SwiperSlide key={blog.id}>
                            <div className='p-4 border rounded-md w-full min-h-[400px]'>
                            <img className='w-full h-40 object-cover mb-4' src={blog.image} alt="" />
                             <div className=''>
                                 <h2 className='text-lg font-bold text-[#2f7662]'>{blog.title}</h2>
                                 <p>{blog.description}</p>                   
                             </div>
                            </div>
                         </SwiperSlide>
                         )
                    }
                   
                </Swiper>
            </>
        </div>
    );
};

export default BlogSection;