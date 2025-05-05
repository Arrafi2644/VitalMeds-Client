
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaHome, FaList, FaUser } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import useSeller from '../../../hooks/useSeller';
import { MdOutlinePayment } from 'react-icons/md';
import { TbMenuOrder, TbReportSearch } from 'react-icons/tb';
import { RiAdvertisementLine } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import { GiMedicines } from 'react-icons/gi';
import "./dashboard.css"

const Dashboard = () => {
    const [isAdmin, adminPending] = useAdmin();
    const [isSeller, sellerPending] = useSeller();
    // const [isUser, setIsUser] = useState(false);

    // console.log("Admin:", isAdmin);
    // console.log("Seller: ", isSeller);


    const adminLinks = <>
        <li><NavLink to='/dashboard/adminHome' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><FaHome></FaHome></span> Admin Home</NavLink></li>
        <li><NavLink to='/dashboard/manageUsers' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><FaUser></FaUser></span> Manage Users</NavLink></li>
        <li><NavLink to='/dashboard/manageCategory' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><BiCategory></BiCategory></span> Manage Category</NavLink></li>
        <li><NavLink to='/dashboard/managePayment' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span> <MdOutlinePayment></MdOutlinePayment></span> Payment Management</NavLink></li>
        <li><NavLink to='/dashboard/salesReport' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><TbReportSearch></TbReportSearch></span> Sales Report</NavLink></li>
        <li><NavLink to='/dashboard/manageAdvertise' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><RiAdvertisementLine></RiAdvertisementLine></span> Manage Banner Advertise</NavLink></li>
    </>

    const sellerLinks = <>
        <li><NavLink to='/dashboard/sellerHome' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><FaHome></FaHome></span>Seller Home</NavLink></li>
        <li><NavLink to='/dashboard/manageMedicine' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><GiMedicines></GiMedicines></span> Manage Medicines</NavLink></li>
        <li><NavLink to='/dashboard/manageOrders' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><TbMenuOrder/></span> Manage Orders</NavLink></li>
        <li><NavLink to='/dashboard/sellerPaymentHistory' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><MdOutlinePayment></MdOutlinePayment></span> Payment History</NavLink></li>
        <li><NavLink to='/dashboard/advertisement' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><RiAdvertisementLine></RiAdvertisementLine></span> Ask For Advertise</NavLink></li>
    </>
    const userLinks = <>
        {/* <li><Link to='/dashboard/userHome' className='flex items-center gap-2 py-1 px-4 hover:bg-white '><FaHome></FaHome>User Home</Link></li> */}
        <li><NavLink to='/dashboard/myOrders' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><TbMenuOrder/></span> My Orders</NavLink></li>
        <li><NavLink to='/dashboard/paymentHistory' className='flex items-center gap-2 py-1 px-4 hover:bg-secondary'><span><MdOutlinePayment></MdOutlinePayment></span> Payment History</NavLink></li>
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