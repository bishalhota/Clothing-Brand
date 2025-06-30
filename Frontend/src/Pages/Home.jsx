import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { fetchProductsByFilters } from '../redux/slices/ProductSlice'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'


const Home = () => {

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8,
    })
    );

    //Fetch best seller
    const fetchBestSeller = async() =>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        console.log(response.data);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching best seller product");
       }
    }
    fetchBestSeller();
  },[dispatch])

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (<p className='text-center'>Loading...</p>)}

      <div className='container mx-auto ' >
        <h2 className='text-3xl text-center font-bold mb-4'>Top Wear for Womens</h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home
