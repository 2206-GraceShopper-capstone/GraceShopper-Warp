import {registerMerchant} from '../apiAdapter'
import React, { useState,useRef } from "react";
import { Link, useNavigate} from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid';
import '../input.css';



const MerchantRegister = () => {
  const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [brand, setBrand] = useState("");
    const [error,setError] = useState(null)
   const [myResult, setMyResult] = useState(null)
//    const [confirmPassword,setConfirmPassword] = useState('')
    
    const usernameRef = useRef();
  
    const handleSubmit = async (event) => {
      try {
        event.preventDefault()
        const result = await registerMerchant(username, password, brand);
        const token = result.token
        if(result.error) {
          setError(result)
          setMyResult(null)
        }else if (token) {
          setError(null)
          setMyResult(result)
          setUsername('')
          setPassword('')
          setBrand('')
          navigate('/adminLogin')
        }
       } catch (error) {
        alert(error);
      }
    };
  
    return (
      <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-gradient-to-t from-rose-300 to-yellow-600">
      <div className="max-w-md w-full space-y-8" >
        <div >
          <div>
            <img
              className="mx-auto h-24 w-auto rounded-lg shadow-gray-700 shadow-md "
              src={require('../components/Logo/coffee.png')}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register as an Admin </h2>
            <p className="mt-2 text-center text-md text-gray-900">
              Or{' '}
              <Link to={'/adminLogin'} className="font-medium text-rose-900 hover:text-yellow-600">
                Click here to Log in as an Admin
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Brand
                </label>
                <input
                  value={brand}
                  onChange={(event)=>{setBrand(event.target.value)}}
                  id="brand"
                  name="brand"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border mb-8 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Brand Name"
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Username
                </label>
                <input
                value={username}
                  onChange={(event)=>{setUsername(event.target.value)}}
                  id="Name"
                  name="full-name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Username"
                />
              </div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md my-8 focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Email Address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event)=>{setPassword(event.target.value)}}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                {/* <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event)=>{setConfirmPassword(event.target.value)}}
                  required
                  className="mt-8 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 sm:text-sm shadow-gray-700 shadow-md"
                  placeholder="Confirm Password"
                /> */}
              </div>
    
            </div>
            <div>
            {error && error.message ? <h3>{error.message}</h3> : null}
        {myResult && myResult.message ? <h3>{myResult.message}</h3> : null}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-900 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900 shadow-gray-700 shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                  <LockClosedIcon className="h-5 w-5 text-yellow-600  group-hover:text-rose-900" aria-hidden="true" />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  };

  export default MerchantRegister