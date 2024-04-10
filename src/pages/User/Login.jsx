import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
      // Here, you can add your logic to handle the login process
      console.log('Username:', username);
      console.log('Password:', password);
    };
  
    return (
        <div className="flex justify-center items-center h-[70vh] w-full">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-20 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full md:w-[30vw] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between  flex-col">
                    <button type="submit" className="bg-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto">
                        Login
                    </button>
                    <p>Don't have an account? </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
