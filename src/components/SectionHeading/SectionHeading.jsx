import React from 'react';

const SectionHeading = ({title, subtitle}) => {
    return (
        <div className='mb-6'>
            <h2 className='text-3xl font-bold '>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
};

export default SectionHeading;