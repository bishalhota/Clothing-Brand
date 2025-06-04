import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 8000,
  });

  const [priceRange, setPriceRange] = useState([0, 8000]);

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Silk",
    "Rayon",
    "Polyester",
    "Linen",
    "Denim",
    "Viscose",
    "Fleece",
  ];

  const Brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Fashionista",
    "H&M",
    "Roadster",
    "Snitch",
    "Highlander",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.brand.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 8000,
    });
    setPriceRange([0, params.maxPrice || 8000]);
  }, [searchParams]);

  const handleFilterChange = (e) =>{
    const {name, value, checked, type} = e.target;
    let newFilters = {...filters};

    if(type === "checkbox"){
      if(checked){
        newFilters[name] = [...(newFilters[name] || []),value];
      } else{
        newFilters[name] = newFilters[name].filter((item)=>item !== value);
      }
    }else{
      newFilters[name] = value;
    }
    setFilters(newFilters)
  }



  const updateURLParams = (newFilters) =>{
    const params = new URLSearchParams()
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="category"
              value={category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((Gender) => (
          <div key={Gender} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="Gender"
              value={Gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{Gender}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="gap-2">
          {colors.map((color) => (
            <div className="space-y-3">
              <input
                type="checkbox"
                name="category"
                value={color}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <button
                key={color}
                name="color"
                value={color}
                onClick={handleFilterChange}
                className="w-4 h-4 rounded-full border border-gray-300 cursor-pointer transition hover:scale=105"
                style={{ backgroundColor: color.toLowerCase() }}
              ></button>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6 ">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>


      {/* Brands */}
      <div className="mb-6 ">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {Brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>


      {/* Price filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2 ">Price Range</label>
        <input type="range" name="priceRange" min={0} max={8000} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>Rs 100</span>
          <span>Rs {priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
