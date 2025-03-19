import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const OTP = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Entered OTP:", otp);
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-yellow-100 p-15">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border">
                <h2 className="text-2xl font-bold text-center mb-3">Enter OTP</h2>
                <p className="text-center text-red-500">OTP is sent to your email ID</p>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-lg"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-lg"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTP;
