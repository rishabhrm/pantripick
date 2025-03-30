import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 relative">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-3xl opacity-80"></div>

      {/* Glassmorphism Form Container */}
      <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 border border-white/30">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
          🛍 Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            name="name"
            placeholder="Product Name"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            name="quantity"
            placeholder="Quantity"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            name="price"
            placeholder="Price"
            required
            onChange={handleChange}
          />
          <textarea
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            name="description"
            placeholder="Product Description"
            rows="3"
            required
            onChange={handleChange}
          ></textarea>

          {/* File Upload */}
          <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-8 rounded-xl cursor-pointer hover:border-blue-500 transition">
            <span className="text-gray-700">📸 Upload Image</span>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Glassmorphism Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-400 hover:scale-105 transition-all"
          >
            🚀 Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
