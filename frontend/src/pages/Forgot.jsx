import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Forgot = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("OTP sent to:", email);
        navigate("/otp");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-yellow-100 p-22">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-6 border">
                <h2 className="text-2xl font-bold text-center">Forgot your password?</h2>
                <p className="mt-3 text-center">
                    Change your password in three easy steps. This will help you to secure your account!
                </p>
                <ul className="mt-3 text-left list-decimal pl-6">
                    <li>Enter your email address below.</li>
                    <li>Our system will send you an OTP to your email.</li>
                    <li>Enter the OTP on the next page.</li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border">
                <h3 className="text-xl font-semibold mb-3">Enter your email address</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-gray-600 text-sm">
                        Enter your registered email address. We'll send an OTP to this address.
                    </p>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        >
                            Get New Password
                        </button>
                        <a
                            href="/login"
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Forgot;
