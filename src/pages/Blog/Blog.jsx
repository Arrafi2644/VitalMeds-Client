import React, { useEffect, useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';

const Blog = () => {
        const [blogs, setBlogs] = useState([])
    
        useEffect(()=>{
            fetch('blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
        }, [])
    
        console.log(blogs);

    return (
        <div className='mx-4 my-12 lg:my-16'>
        <SectionHeading title="Health Articles" subtitle="Get up-to-date on our latest health updates"></SectionHeading>

                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    blogs.map(blog =>  <div key={blog.id}>
                        <div className='p-4 border rounded-md w-full min-h-[400px]'>
                        <img className='w-full h-40 object-cover mb-4' src={blog.image} alt="" />
                         <div className=''>
                             <h2 className='text-lg font-bold text-[#2f7662]'>{blog.title}</h2>
                             <p>{blog.description}</p> 
                             <p className='font-medium mt-2'>Date: {blog.date}</p>                  
                         </div>
                        </div>
                        </div>)} 
                </div>
    </div>
    );
};

export default Blog;