import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'

const UserLayout = () => {
  return (
    <>
        <Header/>
        <main><Outlet /></main>
        <Footer/>
    </>
  )
}

export default UserLayout
