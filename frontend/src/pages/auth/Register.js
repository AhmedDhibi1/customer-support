import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from "../../api/services/user/user.api";

const Register = () => {
 const navigate = useNavigate();
 const firstNameRef = useRef(null);
 const lastNameRef = useRef(null);
 const emailRef = useRef(null);
 const passwordRef = useRef(null);
 const homeAddressRef = useRef(null);
 const [error, setError] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await register(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        homeAddressRef.current.value
      );
      if (response === 200) {
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    }
 };

 return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-10">
              <div className="flex justify-center items-center pt-0 text-white">
 <img src="/assets/_logo.png" className="w-2/6 h-2/6 object-cover mt-[-35px]" alt="Customer Support" />
</div>
                <h3 className="text-3xl font-extrabold">Sign Up</h3>
                <p className="text-sm mt-4">Create an account and start your journey with us.</p>
              </div>
              <div>
                <label className="text-sm mb-2 block">First Name</label>
                <input name="firstName" type="text" required ref={firstNameRef} className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter first name" />
              </div>
              <div>
                <label className="text-sm mb-2 block">Last Name</label>
                <input name="lastName" type="text" required ref={lastNameRef} className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter last name" />
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <input name="email" type="text" required ref={emailRef} className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter email" />
              </div>
              <div>
                <label className="text-sm mb-2 block">Home Address</label>
                <input name="homeAddress" type="text" required ref={homeAddressRef} className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter home address" />
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <input name="password" type="password" required ref={passwordRef} className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]" placeholder="Enter password" />
              </div>
              <div className="!mt-10">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none">
                 Sign Up
                </button>
              </div>
              <p className="text-sm !mt-10 text-center">Already have an account <Link to="/" className="text-blue-600 hover:underline ml-1 whitespace-nowrap">Log in here</Link></p>
            </form>
          </div>
          <div className="lg:h-[500px] md:h-[400px] max-md:mt-10">
            <img src="/assets/12982910_5124558.png" className="w-full h-full object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
 );
};

export default Register;