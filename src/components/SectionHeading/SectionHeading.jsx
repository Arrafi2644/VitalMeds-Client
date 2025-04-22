import React from 'react';

const SectionHeading = ({title, subtitle}) => {
    return (
        <div className='mb-4'>
            <h2 className='text-2xl font-bold '>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
};

export default SectionHeading;