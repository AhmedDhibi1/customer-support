import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getById, update } from "../../api/services/user/user.api";
import Cookies from 'js-cookie';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';

const EditUser = () => {
 const navigate = useNavigate();
 const userId = Cookies.get('userId');
 const firstNameRef = useRef(null);
 const lastNameRef = useRef(null);
 const emailRef = useRef(null);
 const passwordRef = useRef(null);
 const homeAddressRef = useRef(null);
 const [error, setError] = useState(null);
 const [Success, setSuccess] = useState(null);
 const [user, setUser] = useState({});

 useEffect(() => {
    console.log("User ID:", userId);
    const fetchData = async () => {
      try {
        const response = await getById(userId);
        setUser(response);
        firstNameRef.current.value = response.firstName;
        lastNameRef.current.value = response.lastName;
        emailRef.current.value = response.email;
        homeAddressRef.current.value = response.homeAddress;
        
        firstNameRef.current.placeholder = response.firstName;
        lastNameRef.current.placeholder = response.lastName;
        emailRef.current.placeholder = response.email;
        homeAddressRef.current.placeholder = response.homeAddress;
      } catch (err) {
        
        setError(err.message);
      }
    };

    fetchData();
 }, [userId]);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await update(
        userId,
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        homeAddressRef.current.value
      );
      if (response.status === 200) {
        console.log("User updated successfully");
        setSuccess(true);
        return response.status;

      } else {
  
        setError('Error updating user');
      }
    } catch (err) {
      
      setError(err.message);
    }
 };

 return (
  
  
  <div className="p-4 sm:ml-64 w-full flex-col justify-start items-center">
  <div className="w-10/12 mx-auto max-w-6xl ">
    <div className="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 mx-auto">
      <div className="p-4 col-span-6 md:col-span-4">
        <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
        <div className="col-span-2">
 <h1 className=" text-3xl m-10 font-bold text-gray-800">
    User Profile Settings
 </h1>
</div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-blue-900">First Name</label>
              <div className="mt-2">
                <input type="text" id="firstName" autoComplete="given-name" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={firstNameRef} required />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-blue-900">Last Name</label>
              <div className="mt-2">
                <input type="text" id="lastName" autoComplete="family-name" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={lastNameRef} required />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-900">Email Address</label>
              <div className="mt-2">
                <input type="email" id="email" autoComplete="email" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={emailRef} required />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="homeAddress" className="block text-sm font-medium leading-6 text-blue-900">Home Address</label>
              <div className="mt-2">
                <input type="text" id="homeAddress" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={homeAddressRef} required />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">Password</label>
              <div className="mt-2">
                <input type="password" id="password" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={passwordRef} required />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
      {Success &&< SuccessAlert message="User updated successfully" />}
      {error && <ErrorAlert message={error} />  }
    </div>
    </div>
 );
};

export default EditUser;