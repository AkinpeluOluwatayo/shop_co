import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        try {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/users",
                formData
            );

            if (response.status === 200 || response.status === 201) {
                setSuccess("Account created successfully.");
                setTimeout(() => navigate("/Home"), 1500);
            } else {
                setError("Something went wrong. Please try again");
            }
        } catch (err) {
            setError("Network connection error. Please try again");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Get Started</h2>
                <p className="text-gray-500 text-center mb-8">
                    Enter your email and password to get started
                </p>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Email */}
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
                        className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>
                </form>


                <div className="mt-6 text-center text-gray-500">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 underline hover:text-blue-700">
                            Login
                        </Link>
                    </p>
                    <p className="mt-2">
                        <Link to="/forgot-password" className="text-blue-600 underline hover:text-blue-700">
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
