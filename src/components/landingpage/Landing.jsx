import React from "react";
import {Link} from "react-router-dom";

import { Search, ShoppingCart, User } from "lucide-react";
function Landing() {
    return (
        <div className="bg-#f2f0f1 p-6">

            <div className="w-full bg-black text-white text-center py-2 text-sm">
                Sign up and get 20% off your first order.{" "}
                <Link to="/Signup" className="underline cursor-pointer">Sign Up Now</Link>
            </div>

            <nav className="w-full flex items-center justify-between px-6 lg:px-20 py-5 border-b">
                <div className="text-2xl font-bold">SHOP.CO</div>

                <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
                    <li className="cursor-pointer hover:text-black">Shop</li>
                    <li className="cursor-pointer hover:text-black">On Sale</li>
                    <li className="cursor-pointer hover:text-black">New Arrivals</li>
                    <li className="cursor-pointer hover:text-black">Brands</li>
                </ul>


                <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-72">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="ml-2 bg-transparent outline-none text-sm w-full"
                    />
                </div>


                <div className="flex items-center gap-5 text-gray-700">
                    <ShoppingCart className="cursor-pointer" />
                    <User className="cursor-pointer" />
                </div>
            </nav>

            <section className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between px-6 lg:px-20 py-10 gap-10">
                {/* LEFT */}
                <div className="lg:w-1/2 flex flex-col gap-6">
                    <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                        FIND CLOTHES <br />
                        THAT MATCHES <br />
                        YOUR STYLE
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring your individuality and cater to your sense of
                        style.
                    </p>

                    <button className="bg-black text-white px-6 py-3 rounded-full w-fit hover:bg-gray-800">
                        Shop Now
                    </button>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
                        <div>
                            <h2 className="text-3xl font-bold">200+</h2>
                            <p className="text-gray-600">International Brands</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">2,000+</h2>
                            <p className="text-gray-600">High-Quality Products</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">30,000+</h2>
                            <p className="text-gray-600">Happy Customers</p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="/images/LandingPage.png"
                        alt="fashion"
                        className="w-full max-w-md lg:max-w-xl object-cover"
                    />
                </div>
            </section>


            <section className="w-full bg-black text-white py-6 flex flex-wrap justify-center gap-10 text-xl lg:text-2xl font-semibold">
                <p>VERSACE</p>
                <p>ZARA</p>
                <p>GUCCI</p>
                <p>PRADA</p>
                <p>Calvin Klein</p>
            </section>

        </div>
    );
}

export default Landing;
