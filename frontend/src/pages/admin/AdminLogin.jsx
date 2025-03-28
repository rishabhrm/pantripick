import React from "react";
import { motion } from "framer-motion";
import { assets } from '../../assets/assets'


const AdminLogin = () => {
    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/Image/home.png')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm animate-[bgZoom_10s_infinite_alternate_ease-in-out]"></div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <div key={i} className={`absolute w-2 h-2 bg-white bg-opacity-70 rounded-full animate-[float_5s_infinite_ease-in-out]`} style={{ top: `${20 + i * 10}%`, left: `${10 + i * 15}%`, animationDelay: `${i}s` }} />
            ))}

            <motion.div 
                className="flex w-1/2 max-w-3xl shadow-lg rounded-lg overflow-hidden bg-white bg-opacity-95 backdrop-blur-md relative z-10 animate-[fadeInSlide_1.2s_ease-in-out]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <div className="flex-1 flex items-center justify-center p-5">
                    <img src={assets.SignupImage} alt="Admin Illustration" className="w-full max-w-xs max-h-80 object-contain transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="flex-1 p-10 text-center">
                    <h2 className="text-xl font-bold mb-5">ADMIN LOGIN</h2>
                    <form action="/LoginServlet" method="POST">
                        <div className="mb-3">
                            <input type="email" className="w-full p-3 rounded-full border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="w-full p-3 rounded-full border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all" name="password" placeholder="Enter your password" required />
                        </div>
                        <motion.button 
                            type="submit" 
                            className="w-full p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold transition-transform hover:scale-105 shadow-lg"
                            whileTap={{ scale: 0.95 }}
                        >
                            Login
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};


export default AdminLogin;
