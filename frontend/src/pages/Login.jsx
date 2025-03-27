import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const navigate = useNavigate(); // Initialize navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication check
    if (email === "abc@gmail.com" && password === "123") {
      console.log("Login successful!");
      navigate("/"); // Redirect to Home Page
    } else {
      alert("Invalid credentials!"); //  failure
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-yellow-100 p-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          LOGIN <span className="font-bold-500">HERE</span>
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-3 border border-yellow-500 rounded-md focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-3 border border-yellow-500 rounded-md focus:outline-none"
            required
          />
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md mb-2 hover:opacity-80">
            Login
          </button>
        </form>
        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:opacity-80">
          Admin Login
        </button>
        <div className="flex justify-between items-center mt-4 text-sm">
          <a href="/reset-password" className="text-black-500 hover:underline">
            Forgot Password?
          </a>
          <span className="text-black-500 ml-1">|</span>
          <a href="/signup" className="text-blue-700 hover:underline mr-30">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
