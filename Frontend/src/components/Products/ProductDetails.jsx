import React, { useState } from "react";
import { useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/ProductSlice";
import { addToCart } from "../../redux/slices/cartslice";




const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { SelectedProduct, products, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth)



  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId ));
    }
    console.log("selected",SelectedProduct);
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (SelectedProduct?.images?.length > 0) {
      setMainImage(SelectedProduct.images[0].url);
    }
  }, [SelectedProduct]);


  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);

    }
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart", {
        duration: 2000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(addToCart({
      productId: productFetchId,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      userId: user?._id,
      guestId,
    })
    ).then(() => {
      toast.success("Product added to cart", {
        duration: 1000,

      })
    }).finally(() => {
      setIsButtonDisabled(false);
    });

  }

  if (loading) {
    return <p className='text-center'>Loading...</p>
  }

  if (error) {
    return <p className='text-center'>Error fetching product</p>

  }


  return (
    <div className="p-10 ">
      {SelectedProduct && (
        <div className=" max-2-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="p-8 flex flex-col md:flex-row">
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {SelectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Main image */}
            <div className="md:w-[500px]">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>






            {/* Mobile version */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {SelectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>





            {/* Right Side */}
            <div className="md:w-1/2 md:ml-20">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {SelectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {SelectedProduct.originalPrice &&
                  `Rs ${SelectedProduct.originalPrice}`}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                Rs{SelectedProduct.price}
              </p>
              <p className="text-gray-600 mb-4">{SelectedProduct.description}</p>
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {SelectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-[3.5px] cursor-pointer ${selectedColor === color ?
                        "border-black" : "border-gray-300"
                        }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 ">Size:</p>
                <div className="flex gap-2 mt-2">
                  {SelectedProduct.sizes.map((size) => (
                    <button key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border-[2px] cursor-pointer ${selectedSize === size ? "border-black bg-gray-200" : "border-gray-300 bg-white"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="tet-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button className="px-2 py-1 bg-gray-200 rounded text-lg" onClick={() => handleQuantityChange("minus")}>-</button>
                  <span className="text-lg">{quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded text-lg" onClick={() => handleQuantityChange("plus")}>+</button>
                </div>
              </div>

              <button className={`bg-black text-white py-2 px-6 rounded w-3/4 mb-4 cursor-pointer ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`} onClick={handleAddToCart} disabled={isButtonDisabled}>{isButtonDisabled ? "Adding to cart..." : "ADD TO CART"}</button>

              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4 ">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{SelectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{SelectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">You may also like</h2>
            <ProductGrid products={similarProducts} loading={loading} error={error} />
          </div>
        </div>
      )}
    </div>
  );
};


export default ProductDetails;