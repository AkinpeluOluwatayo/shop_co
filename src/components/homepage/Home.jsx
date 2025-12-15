import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/ProductSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="w-full bg-gray-100">
            <h2 className="text-4xl font-bold text-center py-6">New Arrivals</h2>
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-6">
                {products.slice(0, Math.ceil(products.length / 2)).map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-48 object-cover mb-4"
                        />
                        <h3 className="text-lg font-medium">{product.title}</h3>
                        <p className="text-gray-500">${product.price}</p>
                        {product.discountPercentage && (
                            <p className="text-red-500 line-through">
                                ${Math.round(product.price + (product.price * product.discountPercentage) / 100)}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
