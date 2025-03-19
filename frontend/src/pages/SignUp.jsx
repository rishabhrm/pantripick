import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Data:", formData);
        navigate("/login"); // Redirect to login page after successful signup
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-yellow-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">
                    SIGN UP <span className="font-bold-500">HERE</span>
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-orange-400 rounded-md focus:outline-none"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-orange-400 rounded-md focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 mb-3 border border-orange-400 rounded-md focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        Signup
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already a member?{" "}
                    <button
                        onClick={() => navigate("/login")} // Use useNavigate instead of <a href>
                        className="text-blue-500 underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
