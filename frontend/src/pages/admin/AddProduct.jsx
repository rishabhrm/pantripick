import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    image: null,
    category: "", // New field for category
  });

  // Array of categories
  const categories = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the data as multipart/form-data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category); // Append category
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:4567/api/products/add-product", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added:", result);
        // Optionally reset the form or show a success message
        setFormData({
          name: "",
          quantity: "",
          price: "",
          description: "",
          image: null,
          category: "", // Reset category
        });
        alert("Product added successfully!");
      } else {
        console.error("Error adding product");
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product");
    }
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
            value={formData.name}
          />
          <input
            type="number"
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            name="quantity"
            placeholder="Quantity"
            required
            onChange={handleChange}
            value={formData.quantity}
          />
          <input
            type="number"
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            name="price"
            placeholder="Price"
            required
            onChange={handleChange}
            value={formData.price}
          />
          <textarea
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            name="description"
            placeholder="Product Description"
            rows="3"
            required
            onChange={handleChange}
            value={formData.description}
          ></textarea>

          {/* Category Dropdown */}
          <select
            name="category"
            className="w-full px-4 py-2 bg-white bg-opacity-30 border border-black/60 text-gray-800 placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

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
