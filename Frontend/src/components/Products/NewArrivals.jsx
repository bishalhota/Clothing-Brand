import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewArrivals = () => {

    const newArrivals = [
        {
            _id:"1",
            name:"jacket",
            price: 100,
            images:[
                {
                    url:"https://picsum.photos/500/500/random=1",
                    altText:"Jacket Image",
                },
            ],
        },
        {
            _id:"2",
            name:"jacket",
            price: 100,
            images:[
                {
                    url:"https://picsum.photos/500/500/random=2",
                    altText:"Jacket Image",
                },
            ],
        },
        {
            _id:"3",
            name:"jacket",
            price: 100,
            images:[
                {
                    url:"https://picsum.photos/500/500/random=3",
                    altText:"Jacket Image",
                },
            ],
        },
        {
            _id:"4",
            name:"jacket",
            price: 100,
            images:[
                {
                    url:"https://picsum.photos/500/500/random=4",
                    altText:"Jacket Image",
                },
            ],
        },
        {
            _id:"5",
            name:"jacket",
            price: 100,
            images:[
                {
                    url:"https://picsum.photos/500/500/random=5",
                    altText:"Jacket Image",
                },
            ],
        },
        {
            _id:"6",
            name:"jacket",
            price: 100,
            images:[
                {
                    url:"https://picsum.photos/500/500/random=6",
                    altText:"Jacket Image",
                },
            ],
        },
        {
            _id:"8",
            name:"jacket",
            price: 100,
            images:[
                {
                    url:"https://picsum.photos/500/500/random=8",
                    altText:"Jacket Image",
                },
            ],
        },
        
    ];

  return (
    <section>
        <div className='container m-auto text-center mb-10 relative'>
            <h2 className='texxt-3xl font-bold mb-4'>Explore New Arrivals</h2>
            <p className='text-lg text-gray-600 mb-8'>Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.</p>
            {/* Scroll Buttons */}
            <div className="absolute right-0 bottom-[-30px] flex spae-x-2">
                <button className='p-2 rounded border bg-white text-black'>
                    <FiChevronLeft className="text-2xl" />
                </button>
                <button className='p-2 rounded border bg-white text-black'>
                    <FiChevronRight className="text-2xl" />
                </button>
            </div>
        </div>
    </section>
  )
}

export default NewArrivals
