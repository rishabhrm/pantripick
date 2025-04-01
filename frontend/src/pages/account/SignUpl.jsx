import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4567/api/storeuser1", {
                var1: formData.name,
                var2: formData.email,
                var3: formData.password,
            });
            setFormData({ name: "", email: "", password: "" });
            navigate("/login"); // Redirect to login after successful signup
        } catch (error) {
            console.error("Error saving user:", error);
        }
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
                    Already a member? {" "}
                    <button
                        onClick={() => navigate("/login")}
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