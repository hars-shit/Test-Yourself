
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="md:flex justify-evenly items-center bg-white w-full max-w-2xl h-auto p-8 rounded-lg shadow-lg">
        <div className="text-center flex justify-center">
          <img src={logo} className="w-32 h-32 mb-4" alt="Logo"/>
        </div>
        <div className="mt-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Member Login</h2>
          <input type="text" className="w-full md:w-[20vw] border border-gray-300 px-4 py-3 rounded-full mb-7" placeholder="Username"/>
          <input type="password" className="w-full md:w-[20vw] border border-gray-300 px-4 py-3 rounded-full mb-9" placeholder="Password"/>
          <button className="w-full md:w-[20vw] bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition duration-300 mb-3">Login</button>
          <p className='text-gray-500' >Forget Username/password-<Link to='/register' className='text-purple-900'>Signup</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;