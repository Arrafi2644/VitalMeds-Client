import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo/logo5.png'

const Navbar = () => {
  const links = <>
    <li><NavLink to='/'> Home</NavLink></li>
    <li><NavLink to='/shop'> Shop</NavLink></li>

  </>
  return (
    <div className=' px-4'>
      <div className="navbar container mx-auto p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
        <div className="navbar-end">
          <Link><button className="btn bg-primary hover:bg-secondary">Join Us</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;