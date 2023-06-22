import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const host = "https://bookverse-kvr6.onrender.com";
  let navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [cshow, setCShow] = useState(false)

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "warning", 1500);
      setCredentials({ ...credentials, password: "", cpassword: "" });
    } else {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password })
      });
      const jsonres = await response.json();
      console.log(jsonres);
      if (jsonres.success) {
        localStorage.setItem('token', jsonres.authToken);
        props.showAlert("Profile Created Successfully", "success", 1500);
        navigate("/");
      } else {
        props.showAlert(jsonres.error, "danger", 1500);
        setCredentials({ ...credentials, email: "", password: "", cpassword: "" });
      }
    }
  };



  return (
    <div className="flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-4 bg-white shadow-md shadow-indigo-200 hover:shadow-indigo-500 rounded-lg overflow-hidden">
        <h3 className="text-center text-2xl font-bold mb-4 text-indigo-500">Create an Account with us!!</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-1 px-1"
              id="name"
              name="name"
              aria-describedby="nameHelp"
              onChange={handleChange}
              value={credentials.name}
              required
              minLength={5}
              placeholder='Your Name'
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-1 px-1"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleChange}
              value={credentials.email}
              required
              minLength={5}
              placeholder='Your Email'
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={show?'text':'password'}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-1 px-1"
              id="password"
              name="password"
              onChange={handleChange}
              value={credentials.password}
              required
              minLength={5}
              placeholder='Password'
            />
             <i className={`fa-regular ${show?'fa-eye-slash':'fa-eye'} absolute top-3/4 transform -translate-y-1/2 right-2 cursor-pointer`} onClick={()=>{setShow(!show)}}></i>
          </div>
          <div className="mb-3 relative">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input
              type={cshow?'text':'password'}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-1 px-1"
              id="cpassword"
              name="cpassword"
              onChange={handleChange}
              value={credentials.cpassword}
              required
              minLength={5}
              placeholder='Confirm'
            />
            <i className={`fa-regular ${cshow?'fa-eye-slash':'fa-eye'} absolute top-3/4 transform -translate-y-1/2 right-2 cursor-pointer`} onClick={()=>{setCShow(!cshow)}}></i>
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
