import React from 'react'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartDrawer = ({ drawerOpen, setDrawerOpen, toggleCartDrawer }) => {

  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer()
    if (!user) {
      navigate("/login?redirect=checkout");    // if not loggedin first we will get the user to login and then redirect them to checkout page 
    } else {
      navigate("/checkout");
    }
  }

  return (
    <div className={`fixed top-0 right-0 w-3/4 md:w-[30rem] sm:w-1/2   h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className='flex justify-end p-4'>
        {/* Close button */}
        <button onClick={toggleCartDrawer} className='text-gray-700 hover:text-black cursor-pointer'>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Cart Contents */}
      <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (<CartContents cart={cart} userId={userId} guestId={guestId} />) : (<p className='text-center'>Your cart is empty</p>)}

      </div>

      <div className='p-4 bg-white sticky bottom-0'>
        {cart && cart?.products?.length > 0 && (
          <>
            <button className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
              onClick={handleCheckout}
            >Checkout</button>
            <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Shipping, Taxes, and discount codes calculated at checkout</p>
          </>
        )}

      </div>
    </div>
  )
}

export default CartDrawer
