import React, { useState } from 'react';
import axios from 'axios';

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" }
    ],
    vehicleClass: "",
    cylinders: 0,
    fuelType: "",
    engineSize: 0,
    engineCylinders: "",
    enginePowerRatio: 0,
    distance: 0,
    payloadCapacity: 1,
    productWeight: 0,
    totalEmission: 0
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "name" || name === "description" || name === "sku" || name === "vehicleClass" || name === "fuelType"
        ? value
        : Number(value)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    console.log("Image selected:", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Product:", productData);
  };

  const handleEmissionPrediction = async () => {
    const inputArray = [
      productData.vehicleClass,
      productData.cylinders,
      productData.fuelType,
      productData.engineSize,
      productData.engineCylinders,
      productData.enginePowerRatio
    ];

    try {
      const res = await axios.post("http://localhost:5000/predict", { input: inputArray });
      const predictedCO2 = res.data.prediction[0];

      const totalEmission = ((predictedCO2 * productData.distance) / productData.payloadCapacity) * productData.productWeight;

      setProductData(prev => ({
        ...prev,
        totalEmission
      }));
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Product Info */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />
        </div>

        <div className="mb-6">
          <label className='block font-semibold mb-2'>Description</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' rows={4} required />
        </div>

        <div className="mb-6">
          <label className='block font-semibold mb-2'>Price</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
        </div>

        <div className="mb-6">
          <label className='block font-semibold mb-2'>Count in Stock</label>
          <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
        </div>

        <div className="mb-6">
          <label className='block font-semibold mb-2'>SKU</label>
          <input type="text" name="sku" value={productData.sku} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
        </div>

        {/* Sizes and Colors */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Sizes</label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(",").map(s => s.trim()) })}
            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div className="mb-6">
          <label className='block font-semibold mb-2'>Colors</label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(",").map(c => c.trim()) })}
            className='w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className='block font-semibold mb-2'>Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <img key={index} src={image.url} alt="" className='w-20 h-20 object-cover rounded-md shadow-md' />
            ))}
          </div>
        </div>

        {/* Emission Inputs */}
        <h3 className="text-xl font-bold mb-4 mt-8">Emission Details</h3>

        <input name="vehicleClass" placeholder="Vehicle Class" value={productData.vehicleClass} onChange={handleChange} className='w-full mb-4 border p-2 rounded' ></input>
        <input name="cylinders" type="number" placeholder="Cylinders" value={productData.cylinders} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />
        <input name="fuelType" placeholder="Fuel Type" value={productData.fuelType} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />
        <input name="engineSize" type="number" placeholder="Engine Size" value={productData.engineSize} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />
        <input name="engineCylinders" placeholder="Engine Cylinders Bin (e.g. 1.5)" value={productData.engineCylinders} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />
        <input name="enginePowerRatio" type="number" placeholder="Engine Power Ratio" value={productData.enginePowerRatio} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />

        <input name="distance" type="number" placeholder="Distance Traveled (km)" value={productData.distance} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />
        <input name="payloadCapacity" type="number" placeholder="Payload Capacity (kg)" value={productData.payloadCapacity} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />
        <input name="productWeight" type="number" placeholder="Product Weight (kg)" value={productData.productWeight} onChange={handleChange} className='w-full mb-4 border p-2 rounded' />

        <button type="button" onClick={handleEmissionPrediction} className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">
          Predict Emission
        </button>

        {/* Display result */}
        {productData.totalEmission > 0 && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <strong>Total CO₂ Emission:</strong> {productData.totalEmission.toFixed(2)} g
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
