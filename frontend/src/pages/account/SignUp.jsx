import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("User Data:", formData);

        // Proceed with signup (API call, Firebase, etc.)
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-yellow-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">
                    SIGN UP <span className="font-bold-500">HERE</span>
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border border-orange-400 p-2 rounded col-span-2 focus:outline-none"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-orange-400 p-2 rounded focus:outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-orange-400 p-2 rounded  focus:outline-none"
                        required
                    />



                    <input
                        type="text"
                        name="address"
                        placeholder="Address Line"
                        value={formData.address}
                        onChange={handleChange}
                        className="border border-orange-400 p-2 rounded col-span-2 focus:outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="border border-orange-400 p-2 rounded col-span-2 focus:outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-orange-400 rounded-md focus:outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-orange-400 rounded-md focus:outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition col-span-2"
                    >
                        Signup
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already a member?{" "}
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
