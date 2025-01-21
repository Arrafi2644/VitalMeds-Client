import React from 'react';
import SectionHeading from '../../SectionHeading/SectionHeading';
import { Link } from 'react-router-dom';
import useCategories from '../../../hooks/useCategories';

const CategorySection = () => {
    const [categories, refetch] = useCategories();
    return (
        <div className='my-12 md:my-16'>
            <SectionHeading title='Shop By Category'
                subtitle='Click on you category and get'
            ></SectionHeading>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>

                {
                    categories.map(category => <Link to={`/shop`} state={category.categoryName} key={category._id} className='bg-background text-center p-4 border rounded-md'>
                        <img className='w-full h-28 object-cover' src={category.image} alt="" />
                        <h2 className='font-medium mt-2'>{category.categoryName}</h2>
                    </Link>

                    )
                }



            </div>
        </div>
    );
};

export default CategorySection;