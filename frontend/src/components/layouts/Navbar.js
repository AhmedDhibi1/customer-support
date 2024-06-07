import React, { useState,useEffect } from 'react';
import { useNavigate,Link } from "react-router-dom";
import PopUp from '../PopUp';
import { current } from '../../api/services/user/user.api';
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
 const [isOpen, setIsOpen] = useState(false);
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [user, setuser] = useState("");
const [isDialogOpen, setIsDialogOpen] = useState(false);
useEffect(() => {
  const fetchUser = async () => {current().then((response) => {
  setuser(response); 
  });}
  
  fetchUser();
  
}, []);

const handleConfirm = () => {
 Cookies.remove('token');
     Cookies.remove('userEmail');
     Cookies.remove('userId');
     navigate("/");
     window.location.reload();
  // Handle confirmation logic here
  setIsDialogOpen(false);
};

const handleCancel = () => {
  setIsDialogOpen(false);
};
 const handleClick = () => {
    setIsOpen(!isOpen);
 };

 return (
    <nav className="sm:ml-64 w-full flex-col w-full-64 bg-gradient-to-r from-gray-700 to-gray-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
      
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex bg-gray-50 items-center p-2 rounded-md opacity-40">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
				<input class="bg-gray-50 outline-none ml-1 block  " type="text" name="" id="" placeholder="search..."></input>
          </div>
          <p>{name}</p>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative"> 
        <p className="flex-1 ms-3 text-left rtl:text-right text-gray-700 ">{user.firstName} {user.lastName}</p>
            </div>
            <div className="relative ml-3">
              <div>
                <button onClick={handleClick} type="button" className=" relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                 <span className="absolute -inset-1.5"></span>
                 <span className="sr-only">Open user menu</span>
                 <svg class="w-[33px] h-[33px] text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
                </button>
              </div>
              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                 <ul>
                 <li>
            <a href="/Settings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <svg class="w-[27px] h-[27px] dark:text-gray-500 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
</svg>
               <span className="flex-1 ms-3 text-gray-700 whitespace-nowrap">settings</span>
            </a>
         </li>
                 <li>
         <button onClick={() => setIsDialogOpen(true)} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-100" aria-controls="dropdown-example">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="flex-shrink-0 w-5 h-5 text-red-500 transition duration-75 dark:text-gray-500 group-hover:text-gray-900 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
</svg>
<span className="flex-1 ms-3 text-left rtl:text-right text-gray-700 whitespace-nowrap">Logout</span>
            </button>
            <PopUp
        isOpen={isDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmation"
        message="Are you sure you want to proceed?"
      />
         </li>
   

      </ul>
                      </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
 );
};

export default Navbar;