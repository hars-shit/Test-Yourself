import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-[40vw]">
                <h2 className="text-3xl text-center mb-4 font-bold text-gray-800">Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        className="appearance-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="appearance-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-md w-full"
                    />
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        className="input appearance-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-md w-full"
                    />
                    <span className="toggle-password absolute inset-y-0 right-0 pr-3 flex items-center mt-6 cursor-pointer" onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <div className="mb-7 relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2">Confirm Password:</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        className="appearance-none  border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline shadow-md w-full"
                    />
                    <span className="toggle-password absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4">
                        Sign Up
                    </button>
                </div>
                <p className="text-center mt-4 text-gray-700">Already have an account? <Link to="/" className="text-blue-700">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;