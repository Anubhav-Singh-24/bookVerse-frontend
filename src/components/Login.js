import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const host = 'https://bookverse-kvr6.onrender.com';
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false)

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const jsonres = await response.json();
    console.log(jsonres);
    if (jsonres.success) {
      props.showAlert('Logged In Successfully!!', 'success', 1500);
      setCredentials({ email: '', password: '' });
      localStorage.setItem('token', jsonres.authToken);
      navigate('/');
    } else {
      props.showAlert(jsonres.error, 'danger', 1500);
      setCredentials({ ...credentials, password: '' });
    }
  };


  return (
    <div className="flex justify-center items-center my-24">
      <div className="max-w-md w-full px-6 py-4 bg-white shadow-md shadow-indigo-200 hover:shadow-indigo-500 rounded-lg overflow-hidden">
        <h3 className="text-center text-2xl font-bold mb-4 text-indigo-500">Login To your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-1 px-1"
              aria-describedby="emailHelp"
              onChange={handleChange}
              value={credentials.email}
              required
              placeholder='Email'
            />
          </div>
          <div className="relative mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={show?'text':'password'}
              id="password"
              name="password"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-1"
              onChange={handleChange}
              value={credentials.password}
              required
              placeholder='Password'
            /> 
              <i className={`fa-regular ${show?'fa-eye-slash':'fa-eye'} absolute top-3/4 transform -translate-y-1/2 right-2 cursor-pointer`} onClick={()=>{setShow(!show)}}></i>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
