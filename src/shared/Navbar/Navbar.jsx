import React, { useEffect, useState } from 'react';
import { Link, NavLink, redirect } from 'react-router-dom';

import logo from '../../assets/images/logo/logo1.png'
import { IoCartOutline } from 'react-icons/io5';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import useCart from '../../hooks/useCart';
import useSales from '../../hooks/useSales';
import useMedicines from '../../hooks/useMedicines';

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  const [carts] = useCart();
  const [isAdmin] = useAdmin()
  const [isSeller] = useSeller()
  // console.log(user);
  // console.log(carts);
  // console.log("is admin", isAdmin);
  // console.log("is seller", isSeller);
  // const [sales] = useSales()
  // console.log( "sales his", sales);
  const [medicines] = useMedicines()
  // console.log("Medis are ", medicines.slice(-6));

  const links = <>
    <li><NavLink to='/'> Home</NavLink></li>
    <li><NavLink to='/shop'> Medicines</NavLink></li>
    <li><NavLink to='/blog'> Blog</NavLink></li>
  </>

  const handleLogout = () => {
    logoutUser()
    toast.success("Logout successful!")
  }

  

  return (
    <div className=' bg-primary text-white px-4 sticky top-0 left-0 z-20 shadow-xl'>
      <div className="navbar container mx-auto p-0 py-0 font-medium ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn pl-0 btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <Link className='' to='/'> <img className='w-20' src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-2 items-center">

          <Link to='/cart' className='flex items-center gap-1'>
            <span className='text-2xl relative'><IoCartOutline></IoCartOutline> <span className='p-1 bg-primary  rounded-lg textarea-xs text-xs absolute -top-3 -right-1'>{carts.length} </span></span>
            <span className="">Cart</span>
          </Link>

          <select className="select select-bordered bg-transparent bg-primary border-white select-sm">
            <option className='bg-primary' defaultValue='english'>Eng</option>
            <option className='bg-primary' value='bangla'>Ban</option>
          </select>

          {
            user ? <div className="dropdown dropdown-end bg-primary">
              <div tabIndex={0} role="button" className="btn min-h-0 h-auto p-0 rounded-full w-auto border btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img referrerPolicy='no-referrer' src={user.photoURL} alt="User" />
                </div>
              </div>

              <ul tabIndex={0} className="dropdown-content menu bg-primary rounded-md z-[1] w-52 p-2 shadow mt-2">
                <li className='border-b'><Link> Update Profile</Link></li>

                {/* dashboard  */}
                {
                  (user && isAdmin) && <li className='border-b'><Link to='/dashboard/adminHome'> Dashboard</Link></li>
                }

                {
                  (user && isSeller) && <li className='border-b'><Link to='/dashboard/sellerHome'> Dashboard</Link></li>
                }

                {
                  (user && !isSeller && !isAdmin) && <li className='border-b'><Link to='/dashboard/paymentHistory'> Dashboard</Link></li>
                }

                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div> :
              <Link to='/login'><button className="btn btn-sm text-white bg-primary hover:bg-secondary">Join Us</button></Link>
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;