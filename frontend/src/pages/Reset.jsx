import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Email is required.');
            return;
        } else {
            setError('');
        }

        // Handle password reset logic here (e.g., sending a reset link)
        console.log('Password reset link sent to', email);

        // Navigate to OTP page after successful submission
        navigate(`/otp`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Reset Password
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Enter your email to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="text-gray-600 text-sm font-medium">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                    <button
                        type="submit"
                        className="mt-4 bg-gray-700 text-white py-2 rounded hover:bg-blue-800 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a href="/login" className="text-sm text-gray-500 hover:underline">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
