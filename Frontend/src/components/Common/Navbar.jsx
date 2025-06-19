import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  // HiOutlineShoppingCart,
  
} from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {

   const [drawerOpen,setDrawerOpen] = useState(false);
   const [navDrawerOpen,setNavDrawerOpen] = useState(false);

    const toggleCartDrawer = () =>{
        setDrawerOpen(!drawerOpen);
    }
    const toggleNavDrawer = () =>{
        setNavDrawerOpen(!navDrawerOpen);
    }


  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <Link to="/" className="text-2xl medium">
            BeCool
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            MEN
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            WOMEN
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            TOP WEAR
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            BOTTOM WEAR
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="block bg-grey px-2 rounded text-sm text-black border">Admin</Link>
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button onClick={toggleCartDrawer} className="relative hover:text-black cursor-pointer">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1 py-0">
              2
            </span>
          </button>
          <button onClick={toggleNavDrawer} className="md:hidden flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
            <div>ham</div>
          </button>
          <SearchBar className="h-6 w-6 text-gray-700"/>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} toggleCartDrawer={toggleCartDrawer} />

      
      {/* Mobile Navigation */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadowl-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0":"-translate-x-full" }`}>
      <div className="flex justify-end p-4">
        <button onClick={toggleNavDrawer} >
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 ">Menu</h2>
        <nav className="space-y-4">
          <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Men</Link>
          <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Women</Link>
          <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Top wear</Link>
          <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Bottom wear</Link>
        </nav>
      </div>
      </div>
    </>
  );
};

export default Navbar;
