import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <div className="mb-4">
                   
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center">
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button className="bg-black text-white font-bold  px-2 text-sm rounded ml-2 mb-3 focus:outline-none focus:shadow-outline">
    SEND OTP
</button>

                    </div>
                    <p className='text-sm text-gray-800 mb-3'>Didn't Recive IT ? <span>RESEND</span></p>
                <div className="mb-4">
                 
                    <input
                        type="text"
                        id="otp"
                        placeholder="Enter OTP"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign Up
                    </button>
                    
                </div>
                <p className='flex justify-center'>Already have An account ?</p>

            </form>
           
        </div>
    );
};

export default Signup;
