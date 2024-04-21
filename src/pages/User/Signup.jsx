import {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword:''
    });
    const[warningMessage,setWarningMessge]=useState('')
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
       
        setSignupInfo((prevSignUpinfo) => ({ ...prevSignUpinfo, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Account is created:', signupInfo);
        
        if(signupInfo.password !==signupInfo.confirmPassword){
           console.log('password do not match') 
           setWarningMessge('Passwords do not matched');
           return;
        }
        try {
            const response = await axios.post(
                "http://localhost:2001/register",
                {
                    username: signupInfo.username,
                    email: signupInfo.email,
                    password: signupInfo.password,
                    // confirmPassword:signupInfo.confirmPassword
                }
                
            );
                navigate('/')
            // console.log("response:", response);
        } catch (error) {
            console.log("error", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
                <h2 className="text-3xl text-center mb-6 font-bold text-gray-800">Sign Up</h2>
                <div className="mb-5">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={signupInfo.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={signupInfo.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-5 relative">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={signupInfo.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500"
                        placeholder="Enter your password"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-5" onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                </div>
                <div className="mb-10 relative ">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        className="w-full border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-purple-500 relative"
                        value={signupInfo.confirmPassword}
                        onChange={handleChange}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center cursor-pointer mt-5" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                </div>
                {warningMessage&&(
                    <div>

                    <Alert severity="warning"  style={{borderRadius:'30px',marginBottom:'40px'}}>
  {warningMessage}
</Alert>
                    </div>

                )}
                <div className="flex justify-center">
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold py-3 px-6 w-full focus:outline-none">Sign Up</button>
                </div>
                <p className="text-center mt-4 text-gray-700">Already have an account? <Link to="/" className="text-blue-700">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;