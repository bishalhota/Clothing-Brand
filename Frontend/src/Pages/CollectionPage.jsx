import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setisSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setisSidebarOpen(false);
    }
  };

 useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      window.innerWidth < 1024 && // only apply this logic on small screens
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setisSidebarOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=2" }],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=3" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=4" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=6" }],
        },
        {
          _id: 5,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=7" }],
        },
        {
          _id: 6,
          name: "Product 2",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=8" }],
        },
        {
          _id: 7,
          name: "Product 3",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=9" }],
        },
        {
          _id: 8,
          name: "Product 4",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?/random=12" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ?  "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:block fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 `}
      >
        <div className=" w-[233px] h-[100px]"></div>
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <div className="ml-14">
          <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort options */}
          <SortOptions />
        </div>
        

        <ProductGrid products={products}/>
      </div>
    </div>
  );
};

export default CollectionPage;
