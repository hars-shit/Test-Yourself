import{ useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h2 className="text-3xl text-center mb-6 font-bold text-gray-800">Sign Up</h2>
                <div className="mb-5">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500" placeholder="Username"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500"
                    />
                </div>
                <div className="mb-5 relative">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500 "
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-5" onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </span>
                </div>
                <div className="mb-10 relative ">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500 relative"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center cursor-pointer mt-5" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </span>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold py-3 px-6 w-full focus:outline-none">Sign Up</button>
                </div>
                <p className="text-center mt-4 text-gray-700">Already have an account? <Link to="/" className="text-blue-700">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;