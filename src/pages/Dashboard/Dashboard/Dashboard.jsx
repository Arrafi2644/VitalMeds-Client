import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [showMenu, setShowMenu] = useState(false)
    const handleOpenDashMenu = () => {
        setShowMenu(true)

    }

    const adminLinks = <>
        <li><Link className='block py-1 px-4 hover:bg-white'>Admin Home</Link></li>
        <li><Link className='block py-1 px-4 hover:bg-white'>Manage Medicines</Link></li>
        <li><Link className='block py-1 px-4 hover:bg-white'>Manage Category</Link></li>
        <li><Link className='block py-1 px-4 hover:bg-white'>Payment Management</Link></li>
        <li><Link className='block py-1 px-4 hover:bg-white'>Sales Report</Link></li>
        <li><Link className='block py-1 px-4 hover:bg-white'>Manage Banner Advertise</Link></li>
    </>

const sellerLinks = <>
<li><Link className='block py-1 px-4 hover:bg-white'>Seller Home</Link></li>
<li><Link className='block py-1 px-4 hover:bg-white'>Manage Medicines</Link></li>
<li><Link className='block py-1 px-4 hover:bg-white'>Payment History</Link></li>
<li><Link className='block py-1 px-4 hover:bg-white'>Ask For Advertise</Link></li>
</>


    return (
        <div className='container mx-auto grid grid-cols-1 lg:grid-cols-5'>
            <div className='bg-background min-h-screen hidden lg:block pt-4'>
                <ul className='text-sm '>
                   {adminLinks}
                </ul>
            </div>
            <div className={
                `bg-background z-10 min-h-screen absolute lg:hidden pt-8 transition-all duration-300 ${showMenu ? 'left-0' : '-left-[400px]'}`}>
                <ul className='text-sm '>
                    <button className="btn absolute right-0 top-0 rounded-full min-h-0 h-8 w-8 btn-outline" onClick={() => setShowMenu(false)}>X</button>
                   {adminLinks}
                </ul>
            </div>
            <div className='relative p-4 lg:p-4 col-span-1  lg:col-span-4'>
                <button onClick={handleOpenDashMenu} className="btn btn-outline min-h-0 h-8 flex justify-center items-center lg:hidden absolute top-2"><FaList></FaList></button>
                <div className=' my-12'>
                    admin home
                    <Outlet>
                    </Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;