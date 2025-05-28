import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setisDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0); // initialize with 0 instead of false

  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const newArrivals = [
    {
      _id: "1",
      name: "jacket",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?/random=1",
          altText: "Jacket Image",
        },
      ],
    },
    {
      _id: "2",
      name: "jacket",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?/random=2",
          altText: "Jacket Image",
        },
      ],
    },
    {
      _id: "3",
      name: "jacket",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?/random=3",
          altText: "Jacket Image",
        },
      ],
    },
    {
      _id: "4",
      name: "jacket",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?/random=4",
          altText: "Jacket Image",
        },
      ],
    },
    {
      _id: "5",
      name: "jacket",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?/random=5",
          altText: "Jacket Image",
        },
      ],
    },
    {
      _id: "6",
      name: "jacket",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?/random=6",
          altText: "Jacket Image",
        },
      ],
    },
    {
      _id: "8",
      name: "jacket",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?/random=8",
          altText: "Jacket Image",
        },
      ],
    },
  ];

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

   const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(leftScroll > 1); // enable if scrolled more than 10px
      setCanScrollRight(leftScroll < maxScrollLeft - 10);
    }


    
    console.log("Scroll Position:", scrollRef.current.scrollLeft);
    console.log("Container Width:", scrollRef.current.clientWidth);
    console.log("Scroll Width:", scrollRef.current.scrollWidth);
  };


  const handleMouseDown = (e) => {
    setisDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft); // 

  }

  const handleMouseMove = (e) =>{
    if(!isDragging) return;
    const x =  e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUporLeave = (e) => {
    setisDragging(false);
  }

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);
  

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container m-auto text-center mb-10 relative">
        <h2 className="texxt-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => 
              scroll("left")
              
            }
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black": "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => 
              scroll("right")
            }
            disabled={!canScrollRight}
            className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-hidden flex space-x-6 relative over ${isDragging ? "cursor-grabbing" : "cursor-grab"} `}
        onMouseDown={handleMouseDown}
        onMouseMove ={handleMouseMove}
        onMouseUp = {handleMouseUporLeave}
        onMouseLeave = {handleMouseUporLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">Rs{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
