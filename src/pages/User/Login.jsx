import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { log } from '../../redux/loggedSlice';
// import Button from '@mui/material/Button';

const Login = () => {
  const dispatch=useDispatch()
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('warning');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User Logged In', loginInfo);

    try {
      const LoginResponse = await axios.post(
        'http://localhost:2001/login',
        {
          email: loginInfo.email,
          password: loginInfo.password
        }
      );
      console.log('login:', LoginResponse);
      if (LoginResponse.status === 200) {
        dispatch(log(LoginResponse.data))
        setAlertMessage('Successfully logged in');
        setAlertSeverity('success');
      }
    } catch (error) {
      console.log('Error:', error);
      if (error.response && error.response.status === 401) {
        setAlertMessage('Wrong Password');
      } else {
        setAlertMessage('Your password is incorrect');
      }
      setAlertSeverity('error');
    }
    setLoginInfo({
      email: '',
      password: ''
    })
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="md:flex justify-evenly items-center bg-white w-full max-w-2xl h-auto p-8 rounded-lg shadow-lg">
        <div className="text-center flex justify-center">
          <img src={logo} className="w-32 h-32 mb-4" alt="Logo" />
        </div>
        <div className="mt-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Member Login</h2>
          <input
            type="text"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            className="w-full md:w-[20vw] border border-gray-300 px-4 py-3 rounded-full mb-7"
            placeholder="User email"
          />
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            className="w-full md:w-[20vw] border border-gray-300 px-4 py-3 rounded-full mb-4"
            placeholder="Password"
          />
          {alertMessage && (
            <div className="mb-4 rounded-full">
              <Alert severity={alertSeverity} action={alertSeverity === 'error'  } style={{borderRadius:'30px'}}>
                {alertMessage}
              </Alert>
            </div>
          )}
          <button
            type="submit"
            className="w-full md:w-[20vw] bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition duration-300 mb-3"
          >
            Login
          </button>
          <p className='text-gray-500'>Forget Username/password-<Link to='/register' className='text-purple-900'>Signup</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;