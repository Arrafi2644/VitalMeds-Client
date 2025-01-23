

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaHome, FaList, FaUser } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import useSeller from '../../../hooks/useSeller';
import { MdOutlinePayment } from 'react-icons/md';
import { IoCartOutline } from 'react-icons/io5';
import { TbReportSearch } from 'react-icons/tb';
import { RiAdvertisementLine } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import { GiMedicines } from 'react-icons/gi';

const Dashboard = () => {
    const [isAdmin, adminPending] = useAdmin();
    const [isSeller, sellerPending] = useSeller();
    // const [isUser, setIsUser] = useState(false);

    // if (!isAdmin && !isSeller) {
    //     setIsUser(true)
    // }

    console.log("Admin:", isAdmin);
    console.log("Seller: ", isSeller);
    // console.log("User: ", isUser);

    // let isAdmin = true;
    // let isSeller = false;
    // let isUser = false;


    const adminLinks = <>
        <li><Link to='/dashboard/adminHome' className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><FaHome></FaHome></span> Admin Home</Link></li>
        <li><Link to='/dashboard/manageUsers' className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><FaUser></FaUser></span> Manage Users</Link></li>
        <li><Link to='/dashboard/manageCategory' className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><BiCategory></BiCategory></span> Manage Category</Link></li>
        <li><Link className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span> <MdOutlinePayment></MdOutlinePayment></span> Payment Management</Link></li>
        <li><Link className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><TbReportSearch></TbReportSearch></span> Sales Report</Link></li>
        <li><Link  to='/dashboard/manageAdvertise' className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><RiAdvertisementLine></RiAdvertisementLine></span> Manage Banner Advertise</Link></li>
    </>

    const sellerLinks = <>
        <li><Link to='/dashboard/sellerHome' className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><FaHome></FaHome></span>Seller Home</Link></li>
        <li><Link to='/dashboard/manageMedicine' className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><GiMedicines></GiMedicines></span> Manage Medicines</Link></li>
        <li><Link className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><MdOutlinePayment></MdOutlinePayment></span> Payment History</Link></li>
        <li><Link to='/dashboard/advertisement' className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><RiAdvertisementLine></RiAdvertisementLine></span> Ask For Advertise</Link></li>
    </>  
    const userLinks = <>
        <li><Link to='/dashboard/userHome' className='flex items-center gap-2 py-1 px-4 hover:bg-white '><FaHome></FaHome>User Home</Link></li>
        <li><Link className='flex items-center gap-2 py-1 px-4 hover:bg-white'><span><MdOutlinePayment></MdOutlinePayment></span> Payment History</Link></li>
    </>

    return (

        <div className='container mx-auto grid grid-cols-1 lg:grid-cols-5'>
            <div className='bg-background min-h-screen hidden lg:block pt-4'>
                <ul className='text-sm '>
                 
                  {
                    isAdmin ? adminLinks : isSeller ? sellerLinks : userLinks
                  }


                </ul>
            </div>

            <div className="drawer lg:hidden z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-ghost pl-0 ml-4 text-base drawer-button"><FaList></FaList></label>
                </div>
                <div className="drawer-side pt-20">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-background text-base-content min-h-full w-72">
                        {/* Sidebar content here */}
                        {
                    isAdmin ? adminLinks : isSeller ? sellerLinks : userLinks
                  }
                    </ul>
                </div>
            </div>
            <div className='relative p-4 lg:p-4 col-span-1  lg:col-span-4'>

                <div className=''>
                    <Outlet>
                    </Outlet>
                </div>
            </div>
            <Helmet>
                <title>VitalMeds | Dashboard</title>

            </Helmet>
        </div>
    );
};

export default Dashboard;