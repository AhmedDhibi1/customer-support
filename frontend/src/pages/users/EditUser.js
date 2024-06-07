import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById, update } from "../../api/services/user/user.api";

const EditUser = () => {
 const navigate = useNavigate();
 const { id: userId } = useParams();
 const firstNameRef = useRef(null);
 const lastNameRef = useRef(null);
 const emailRef = useRef(null);
 const passwordRef = useRef(null);
 const homeAddressRef = useRef(null);
const roleIdRef = useRef(null);
 const [error, setError] = useState(null);
 const [user, setUser] = useState({});

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getById(userId);
        console.log(response);
        setUser(response);
        firstNameRef.current.value = response.firstName;
        lastNameRef.current.value = response.lastName;
        emailRef.current.value = response.email;
        homeAddressRef.current.value = response.homeAddress;
        roleIdRef.current.value = response.roleId;
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
        homeAddressRef.current.value,
        roleIdRef.current.value
      );
      if (response.status === 200) {
        console.log("User updated successfully");
        window.history.back(); // Assuming you have a UsersList page
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
                <p className={error ? "error font-bold p-2 mb-2" : "offscreen"} aria-live="assertive">{error}</p>
                <h1 className="text-gradient flex flex-col justify-center items-center text-3xl p-5 m-10 font-bold text-blue-900">Edit User</h1>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-blue-900">First Name</label>
                <div className="mt-2">
                 <input type="text" id="firstName" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={firstNameRef} required />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-blue-900">Last Name</label>
                <div className="mt-2">
                 <input type="text" id="lastName" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={lastNameRef} required />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-900">Email</label>
                <div className="mt-2">
                 <input type="email" id="email" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={emailRef} required />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="homeAddress" className="block text-sm font-medium leading-6 text-blue-900">Home Address</label>
                <div className="mt-2">
                 <input type="text" id="homeAddress" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={homeAddressRef} required />
                </div>
              </div>

              <div className="col-span-2">
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-blue-900">Role</label>
              <div className="mt-2">
                <select id="role" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={roleIdRef} required>
                 <option value="1">Client</option>
                 <option value="2">Agent</option>
                 <option value="3">Admin</option>
                 <option value="4">WebMaster</option>
                </select>
              </div>
            </div>

              <div className="col-span-2">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">Password</label>
                <div className="mt-2">
                 <input type="password" id="password" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={passwordRef} required />
                </div>
              </div>

              <div className="col-span-2">
                <div className="mt-6 flex items-center justify-end gap-x-6">
                 <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                 <button type="submit" className="rounded-md bg-gradient-to-r from-blue-900 to-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Update User</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default EditUser;