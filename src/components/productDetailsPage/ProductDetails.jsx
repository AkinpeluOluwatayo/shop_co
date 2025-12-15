// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../redux/actions/ProductSlice";

// Footer data
const footerLinks = {
    Company: ['About', 'Features', 'Works', 'Career'],
    Help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
    FAQ: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
    Resources: ['Free Ebooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
};

const ProductPageDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleProduct, loading, error } = useSelector((state) => state.products);

    const [selectedSize, setSelectedSize] = useState("Medium");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("Rating & Reviews");
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        dispatch(fetchSingleProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (singleProduct && singleProduct.images && singleProduct.images.length > 0) {
            setMainImage(singleProduct.images[0]);
        }
    }, [singleProduct]);

    if (loading) return <p className="text-center mt-10">Loading product...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!singleProduct) return <p className="text-center mt-10">Product not found!</p>;

    const { title, description, price, discountPercentage, rating, images } = singleProduct;
    const originalPrice = Math.round(price + (price * (discountPercentage || 0)) / 100);

    const reviews = [
        { user: "Jane Doe", rating: 4.5, comment: "Absolutely love this product! Quality is amazing and fits perfectly." },
        { user: "John Smith", rating: 4, comment: "Very good overall. A little expensive, but worth it." },
        { user: "Emily R.", rating: 5, comment: "Exceeded my expectations! Will buy again." },
        { user: "Michael B.", rating: 3.5, comment: "Good product, but delivery was slow." },
        { user: "Sarah K.", rating: 5, comment: "Perfect! Highly recommend to everyone." },
        { user: "David L.", rating: 4, comment: "Nice quality, looks exactly like the photos." }
    ];

    return (
        <div className="font-sans bg-white">

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:flex lg:space-x-12">
                    {/* Images */}
                    <div className="flex-shrink-0 flex space-x-4 lg:w-5/12">
                        <div className="hidden sm:flex flex-col space-y-4 w-24">
                            {images.map((thumb, index) => (
                                <div
                                    key={index}
                                    className={`w-full aspect-square border-2 rounded-lg overflow-hidden cursor-pointer ${
                                        mainImage === thumb ? "border-black" : "border-gray-200"
                                    }`}
                                    onClick={() => setMainImage(thumb)}
                                >
                                    <img
                                        src={thumb}
                                        alt={`${title} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex-grow aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
                            <img src={mainImage} alt={title} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-8 lg:mt-0 lg:w-7/12">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">{title}</h1>

                        {/* Rating & Price */}
                        <div className="mt-2">
                            <div className="flex items-center space-x-2">
                                <div className="flex text-yellow-500">
                                    {Array(Math.floor(rating)).fill(0).map((_, i) => (
                                        <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.5 3 1-6L.5 8h6l2.5-5 2.5 5h6l-4 3 1 6L10 15z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{rating.toFixed(1)}/5</span>
                            </div>

                            <div className="mt-4 flex items-baseline space-x-3">
                                <span className="text-4xl font-bold tracking-tight">${price}</span>
                                <span className="text-xl line-through text-red-400">${originalPrice}</span>
                                <span className="text-base font-medium text-red-500 bg-red-100 px-2 py-0.5 rounded-full">
                  -{(100 * (originalPrice - price) / originalPrice).toFixed(0)}%
                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mt-6 text-base text-gray-700 leading-relaxed">{description}</p>

                        {/* Size Selector */}
                        <div className="mb-8 mt-6">
                            <h3 className="text-base font-medium text-gray-900 mb-2">Choose Size</h3>
                            <div className="flex space-x-3">
                                {["Small", "Medium", "Large", "X-Large"].map((size) => (
                                    <button
                                        key={size}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-150 ${
                                            selectedSize === size ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex items-center border border-gray-300 rounded-full h-12 w-32 sm:w-auto overflow-hidden flex-shrink-0">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-full text-lg font-bold hover:bg-gray-100 transition duration-150"
                                >
                                    -
                                </button>
                                <span className="flex-grow text-center text-lg font-medium select-none">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-full text-lg font-bold hover:bg-gray-100 transition duration-150"
                                >
                                    +
                                </button>
                            </div>
                            <button className="mt-4 sm:mt-0 flex-grow bg-black text-white text-base font-medium uppercase tracking-wider h-12 rounded-full hover:bg-gray-800 transition duration-150">
                                Add to Cart
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="mt-16">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                    {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`py-3 px-1 text-lg font-medium transition-colors duration-150 ${
                                                activeTab === tab
                                                    ? "border-b-4 border-black text-black"
                                                    : "border-b-4 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="py-8">
                                {activeTab === "Product Details" && (
                                    <p className="text-gray-700">
                                        Detailed specifications and material information go here.
                                    </p>
                                )}
                                {activeTab === "Rating & Reviews" && (
                                    <div className="flex space-x-6 overflow-x-auto py-4">
                                        {reviews.map((review, idx) => (
                                            <div
                                                key={idx}
                                                className="flex-shrink-0 w-80 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 bg-white"
                                            >
                                                <div className="flex items-center mb-2">
                                                    <div className="flex text-yellow-500 mr-2">
                                                        {Array.from({ length: 5 }, (_, i) => {
                                                            if (review.rating >= i + 1) {
                                                                return (
                                                                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                                                        <path d="M10 15l-5.5 3 1-6L.5 8h6l2.5-5 2.5 5h6l-4 3 1 6L10 15z" />
                                                                    </svg>
                                                                );
                                                            } else if (review.rating > i && review.rating < i + 1) {
                                                                return (
                                                                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                                                        <defs>
                                                                            <linearGradient id={`halfGradient${idx}-${i}`}>
                                                                                <stop offset="50%" stopColor="currentColor" />
                                                                                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                                                                            </linearGradient>
                                                                        </defs>
                                                                        <path fill={`url(#halfGradient${idx}-${i})`} d="M10 15l-5.5 3 1-6L.5 8h6l2.5-5 2.5 5h6l-4 3 1 6L10 15z" />
                                                                    </svg>
                                                                );
                                                            } else {
                                                                return (
                                                                    <svg key={i} className="h-5 w-5 fill-gray-300" viewBox="0 0 20 20">
                                                                        <path d="M10 15l-5.5 3 1-6L.5 8h6l2.5-5 2.5 5h6l-4 3 1 6L10 15z" />
                                                                    </svg>
                                                                );
                                                            }
                                                        })}
                                                    </div>
                                                    <span className="font-semibold text-gray-900">{review.user}</span>
                                                </div>
                                                <p className="text-gray-700">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === "FAQs" && <p className="text-gray-700">FAQs content placeholder.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SPACING BEFORE FOOTER */}
            <div className="h-40"></div> {/* Add a 40px spacer so footer doesn't clash */}

            {/* Footer Section */}
            <footer className="bg-gray-50 font-sans">
                {/* Subscribe Banner */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black text-white p-8 sm:p-12 lg:p-16 rounded-3xl flex flex-col lg:flex-row items-center justify-between shadow-2xl">
                        <div className="mb-8 lg:mb-0 lg:w-1/2">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight uppercase">
                                STAY UPTO DATE ABOUT OUR LATEST OFFERS
                            </h2>
                        </div>
                        <div className="w-full lg:w-auto flex flex-col space-y-4 lg:ml-12">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full lg:w-96 bg-white text-black py-3 rounded-full font-bold uppercase shadow-lg hover:bg-gray-200 transition duration-150"
                                    aria-label="Enter your email address"
                                />
                            </div>
                            <button className="w-full lg:w-96 bg-white text-black py-3 rounded-full font-bold uppercase shadow-lg hover:bg-gray-200 transition duration-150">
                                Subscribe to Newsletter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-10">
                        <div className="col-span-2 md:col-span-2">
                            <h3 className="text-3xl font-extrabold tracking-tight mb-4">SHOP.CO</h3>
                            <p className="text-sm text-gray-600 max-w-xs mb-6">
                                We have clothes that suits your style and which you're proud to wear. From women to men.
                            </p>
                        </div>

                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title} className="col-span-1">
                                <h4 className="text-base font-medium text-gray-900 mb-4">{title.toUpperCase()}</h4>
                                <ul className="space-y-3">
                                    {links.map((link, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-sm text-gray-600 hover:text-black hover:underline transition">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <p className="text-sm text-gray-600 mb-4 md:mb-0">
                            Shop.co © 2000-2023, All Rights Reserved
                        </p>
                        <div className="flex space-x-3 items-center">
                            <span className="text-sm border p-1 rounded-sm bg-white shadow">VISA</span>
                            <span className="text-sm border p-1 rounded-sm bg-white shadow">PAYPAL</span>
                            <span className="text-sm border p-1 rounded-sm bg-white shadow">G PAY</span>
                            <span className="text-sm border p-1 rounded-sm bg-white shadow">P Pay</span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default ProductPageDetails;
