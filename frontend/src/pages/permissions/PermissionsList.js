import React, { useState, useEffect } from 'react';
import { getAllPermissions } from '../../api/services/permission/permission.api'; 
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const PermissionsList = () => {
 const [permissions, setPermissions] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState(''); // State for search term

 useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const userEmail = Cookies.get('userEmail');
        console.log('User email:', userEmail);
        const fetchedPermissions = await getAllPermissions(userEmail);
        console.log('Permissions:', fetchedPermissions);
        setPermissions(fetchedPermissions);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setIsLoading(false); 
      }
    };

    fetchPermissions();
 }, []);

 const filteredPermissions = permissions.filter(permission =>
   permission.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 if (isLoading) {
    return <p>Loading...</p>; 
 }

 return (
    <div className="p-4 sm:ml-64">
      <div className="bg-white p-8 rounded-md w-full">
        <div className="flex items-center justify-between pb-6">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input 
              className="bg-gray-50 outline-none ml-1 block" 
              type="text" 
              placeholder="search..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
            />
          </div>
          <div className="lg:ml-40 ml-10 space-x-8">
            <Link to="/CreatePermission" className="bg-gray-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</Link>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                 <tr>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                     
                    </th>
                    
                 </tr>
                </thead>
                <tbody>
                 {filteredPermissions.map((permission) => ( // Use filteredPermissions here
                    <tr key={permission.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{permission.id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{permission.name}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{permission.description}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex justify-end">
                          <button className="bg-blue-700 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                            <Link to={`/EditPermission/${permission.id}`} className="flex items-center">
                              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                              </svg>
                              <span className="ml-2">Edit</span>
                            </Link>
                          </button>
                      
                      <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-4">
                            <Link to={`/DeletePermission/${permission.id}`} className="flex items-center">
                              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                              </svg>
                              <span className="ml-2">Delete</span>
                            </Link>
                          </button>
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default PermissionsList;