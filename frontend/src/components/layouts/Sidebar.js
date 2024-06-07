import { useNavigate,Link } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import { getAllUsers, checkPermission ,getById} from '../../api/services/user/user.api';
import Cookies from "js-cookie";
import PopUp from '../PopUp';
import Chatbot from "../../pages/chatbot/Chatbot";

const Sidebar = () => {
   const navigate = useNavigate();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [chatbot, setChatbot] = useState(false);
   const [usersPermission, setUsersPermission] = useState(false);
   const [rolesPermission, setRolesPermission] = useState(false);
   const [ticketItemPermission, setTicketItemPermission] = useState(false);
   const [permissionsPermission, setPermissionsPermission] = useState(false);   
   const [selectedItem, setSelectedItem] = useState('home');
   const userId = Cookies.get('userId');
   const [roleId, setRoleId] = useState(0);

   useEffect(() => {
		getById(userId).then((response) => {
      console.log(response.RoleId);
      setRoleId(response.RoleId);
    });
      const checkAndSetPermission = async () => {
      const UsersPermission = await checkPermission('users-getAll');
      const RolesPermission = await checkPermission('roles-getAll');
      const TicketItemPermission = await checkPermission('ticketItem-getAll');
      const PermissionsPermission = await checkPermission('permissions-getAll');

      setUsersPermission(UsersPermission);
      setRolesPermission(RolesPermission) ;
      setTicketItemPermission(TicketItemPermission);
      setPermissionsPermission(PermissionsPermission);
   };


      checkAndSetPermission();
   }, []);
  
  
   const toggleChatbot = () => {
      setChatbot(!chatbot);   
   };
 const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
 };
 const [isDialogOpen, setIsDialogOpen] = useState(false);

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

 const handleItemClick = (item) => {
   setSelectedItem(item);
 };
  return (
    
    <div>
  <button  onClick={() => toggleChatbot()}
    class="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-gradient-to-r from-gray-900 to-gray-600 p-0 normal-case leading-5 hover:text-blue-900"
    type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
   { ! chatbot&& <svg xmlns=" http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="text-white block border-gray-200 align-middle">
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" class="border-gray-200">
      </path>
    </svg>}
    { chatbot&& <svg class="w-[33px] h-[33px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
</svg>}
  </button>
 { chatbot&& <Chatbot />}
      <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   
   <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-r from-gray-900 to-gray-700 ">
   <div className="flex justify-center items-center pt-5 text-white">
   <img src="/assets/_logo.png" className="w-2/3 h-2/3 object-cover" alt="Customer Support" />
</div>
      <ul className="space-y-2 font-medium">
         <li>
         <Link to="/home" 
      className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'home'? 'bg-gray-700 text-black' : ''}`}
      onClick={() => handleItemClick('home')}
      style={{ textDecoration: selectedItem === 'home'? 'underline' : 'none' }}
>
         <svg class="w-[26px] h-[26px] text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
</svg>
               <span className="ms-3">Home</span>
            </Link>
         </li> 
         { roleId >1 &&
         <li>
         <Link to="/Dashboard"
            className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'Dashboard'? 'bg-gray-700 text-black' : ''}`}
            onClick={() => handleItemClick('Dashboard')}
            style={{ textDecoration: selectedItem === 'Dashboard'? 'underline' : 'none' }}
            >
            <svg class="w-[27px] h-[27px] text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z" clip-rule="evenodd"/>
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
         </Link>
         </li> 
         }
         <li>
            <Link to="/About" 
               className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'About'? 'bg-gray-700 text-black' : ''}`}
               onClick={() => handleItemClick('About')}
               style={{ textDecoration: selectedItem === 'About'? 'underline' : 'none' }}
               >            
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
               <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </Link>
         </li>
         <li>
            <button onClick={toggleDropdown} id="dropdown-toggle" type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Tickets</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
            </button>
            {isDropdownOpen && (
            <ul id="dropdown-example" className="py-2 space-y-2">
                  <li>
                  <Link 
                  to="/TicketsList"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'TicketsList'? 'bg-gray-700 text-black' : ''}`}
                  onClick={() => handleItemClick('TicketsList')}
                  style={{ textDecoration: selectedItem === 'TicketsList'? 'underline' : 'none' }}
                  >                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="ms-3">all tickets</span>
               </Link>                  
               </li>
            <li>
                     
            <Link to="/CreateTicket" 
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'CreateTicket'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('CreateTicket')}
style={{ textDecoration: selectedItem === 'CreateTicket'? 'underline' : 'none' }}
>   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

   
                  <span className="ms-3">new ticket</span>
               </Link>                
                </li>
                  
            </ul>)}
         </li>
      
         {ticketItemPermission&&
         <li> 
            <Link to="/TicketItemList"
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'TicketItemList'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('TicketItemList')}
style={{ textDecoration: selectedItem === 'TicketItemList'? 'underline' : 'none' }}
>            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Ticket Items</span>
            </Link>
         </li>}
         
        {/* {usersPermission&& <li>
            <Link to="/UsersList" 
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'UsersList'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('UsersList')}
style={{ textDecoration: selectedItem === 'UsersList'? 'underline' : 'none' }}
>
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
         </li>} */}

{ roleId >1 && 
<li>
            <Link to="/ClientsList"
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'ClientsList'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('ClientsList')}
style={{ textDecoration: selectedItem === 'ClientsList'? 'underline' : 'none' }}
>            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Clients</span>
            </Link>
         </li>}
         { roleId >2 &&
          <li>
            <Link to="/AgentsList"
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'AgentsList'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('AgentsList')}
style={{ textDecoration: selectedItem === 'AgentsList'? 'underline' : 'none' }}
>            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-green-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Agents</span>
            </Link>
         </li>  }
         { roleId >3 &&   
         <li>
            <Link to="/AdminsList" 
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'AdminsList'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('AdminsList')}
style={{ textDecoration: selectedItem === 'AdminsList'? 'underline' : 'none' }}
>            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-blue-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Admins</span>
            </Link>
         </li>}
         { roleId >3 &&
         <li>
            <Link to="/WebMastersList" 
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'WebMastersList'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('WebMastersList')}
style={{ textDecoration: selectedItem === 'WebMastersList'? 'underline' : 'none' }}
>            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-red-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">WebMasters</span>
            </Link>
         </li>}
         { roleId >3 &&
        <li>
            <Link to="/RolesList" 
               className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'RolesList'? 'bg-gray-700 text-black' : ''}`}
               onClick={() => handleItemClick('RolesList')}
               style={{ textDecoration: selectedItem === 'RolesList'? 'underline' : 'none' }}
               >            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">  <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Roles</span>
            </Link>
         </li>}
         
         { roleId >3 &&
        <li>
         <Link to="/PermissionsList"
className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedItem === 'PermissionsList'? 'bg-gray-700 text-black' : ''}`}
onClick={() => handleItemClick('PermissionsList')}
style={{ textDecoration: selectedItem === 'PermissionsList'? 'underline' : 'none' }}
>            <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
</svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Permissions</span>
            </Link>
         </li>}
         
         
         

      </ul>
   </div>
</aside>
    </div>
  );
};


export default Sidebar;