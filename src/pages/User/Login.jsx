import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
   
    const handleSubmit = (e) => {
      e.preventDefault(); 

      console.log('Username:', username);
      console.log('Password:', password);
    };
  
    return (
        <div className="flex justify-center items-center h-screen w-full">
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
                    <button type="submit" className="bg-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-3">
                        Login
                    </button>
                    <p>Don't have an account? <Link to='/register' className='text-blue-700'>Signup</Link> </p>
                </div>
            </form>
        </div>
    );
};

export default Login;