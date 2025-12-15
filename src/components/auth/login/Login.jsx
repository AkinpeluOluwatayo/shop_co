import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/actions/UserLoginSlice.js";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }
        // Dispatch the thunk instead of calling axios directly
        dispatch(loginUser(formData));
    };

    // Navigate after successful login
    useEffect(() => {
        if (user) {
            setTimeout(() => navigate("/Home"), 1500);
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Login to Your Account</h2>
                <p className="text-gray-500 text-center mb-8">
                    Enter your email and password to access your account
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password ( at least 8 characters )"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
                {user && <p className="mt-4 text-green-600 text-center">Login Successfully</p>}

                <div className="mt-6 text-center text-gray-500">
                    <p>
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600 underline hover:text-blue-700">
                            Sign Up
                        </a>
                    </p>
                    <p className="mt-2">
                        <a href="/forgot-password" className="text-blue-600 underline hover:text-blue-700">
                            Forgot password?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
