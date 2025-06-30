import React from 'react'
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

const MyOrdersPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders,loading,error } = useSelector((state) => state.orders);

    useEffect(()=>{
        dispatch(fetchUserOrders());
        
    },[dispatch])

 
    const handleRowClick = (orderId) =>{
        navigate(`/order/${orderId}`)
    }

    if(loading){
        return <p className='text-center'>Loading...</p>
    }

    if(error){
        return <p className='text-center'>Error fetching orders:{error}</p>
    }




  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'>My orders</h2>
        <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-2 px-4 sm:py-3'>Image</th>
                        <th className='py-2 px-4 sm:py-3'>Order ID</th>
                        <th className='py-2 px-4 sm:py-3'>Created</th>
                        <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                        <th className='py-2 px-4 sm:py-3'>Items</th>
                        <th className='py-2 px-4 sm:py-3'>Price</th>
                        <th className='py-2 px-4 sm:py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>{orders.length > 0 ?(
                    orders.map((order) =>(
                        <tr key={order._id} onClick={() => handleRowClick(order._id)} className='border-b hover:border-gray-50 cursor-pointer'>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                <img src={order.OrderItems[0].image} alt="" className='w-10 h-10 sm:w-12 sm:h-12' object-cover rounded-lg />
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap '>#{order._id}</td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                {new Date(order.createdAt).toLocaleDateString()}{" "}
                                {new Date(order.createdAt).toLocaleTimeString()}
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                {order.shippingAddress ? `${order.shippingAddress.city}`:"N/A"}
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.OrderItems.length}</td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>Rs{order.totalPrice}</td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                <span className={`${order.isPaid ? "bg-green-100 text-green-700":"bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium `}
                                px-2 py-1 rounded-full text-xs sm:text-sm font-medium
                                >{order.isPaid ? "Paid" : "Pending"}</span>
                            </td>
                        </tr>
                    ))
                ):(
                    <tr>
                        <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>You have no orders</td>
                    </tr>
                )}</tbody>
            </table>
        </div>
      
    </div>
  )
}

export default MyOrdersPage
