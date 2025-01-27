import React from 'react';

const ErrorPage = () => {
    return (
        <div className='bg-secondary min-h-screen flex flex-col gap-4 items-center text-center justify-center'>
            <h2 className='text4xl md:text-5xl font-bold'>404</h2>
            <p className='text-lg font-medium'>Page not found</p>
        </div>
    );
};

export default ErrorPage;