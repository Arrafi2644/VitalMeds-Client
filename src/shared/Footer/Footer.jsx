import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo5.png'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-base-300 px-4 py-10'>

      <footer className="footer container mx-auto text-base-content ">

        <nav>
          <Link className='mb-6' to='/'> <img className='w-28' src={logo} alt="" />
          </Link>
          <h6 className="footer-title">Follow Us</h6>
          <div className="grid grid-flow-col gap-4">
            <Link to='https://www.facebook.com/arrafi.rafi.1238' className='text-2xl'><FaFacebook></FaFacebook></Link>
            <Link to='https://www.instagram.com/arrafi9214/?hl=en' className='text-2xl'><FaInstagram></FaInstagram></Link>
            <Link to='https://www.linkedin.com/in/md-ar-rafi-fayez-joy' className='text-2xl'><FaLinkedin></FaLinkedin></Link>

          </div>
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Blog</a>
          <a className="link link-hover">Testimonial</a>
        </nav>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Order medicine</a>
          <a className="link link-hover">Healthcare Products</a>
          <a className="link link-hover">Online Counseling</a>
          <a className="link link-hover">Delivery</a>
        </nav>

      </footer>
      <div className="divider"></div>
      <aside className=' text-center'>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by VitalMeds.com</p>
      </aside>
    </div>
  );
};

export default Footer;