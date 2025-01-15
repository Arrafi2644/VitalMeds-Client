import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='font-inter '>
            <Navbar></Navbar>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;