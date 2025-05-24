import React from "react";
import {Link} from "react-router-dom";
import {TbBrandMeta} from "react-icons/tb";
import {IoLogoInstagram} from "react-icons/io5";
import {RiTwitterXLine} from "react-icons/ri";
import {FiPhoneCall} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off on your first order
          </p>

          {/* Newsletter Signup Form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all required"
            />
            <button
              type="submit"
              className="bg-black text-black text-sm px-6 py-3 rounded-r-md hover:bg-gray-300"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's bottom wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's bottom wear
              </Link>
            </li>
          </ul>
        </div>
        {/* support */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        {/* Social links */}
        <div>
            <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4 mb-6">
                <a href="https://www.facebook.com"
                    target ="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600"
                >
                    <TbBrandMeta className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com"
                    target ="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600"
                >
                    <IoLogoInstagram className="h-4 w-4" />
                </a>
                <a href="https://www.facebook.com"
                    target ="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600"
                >
                    <RiTwitterXLine className="h-4 w-4" />
                </a>
            </div>
            <p className="text-gray-500">Call us</p>
            <p>
                <FiPhoneCall className="inline-block mr-2" /> 0123-456-7890
            </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className = "text-gray-500 text-sm text-center tracking-tighter">2025, CompileTab. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
