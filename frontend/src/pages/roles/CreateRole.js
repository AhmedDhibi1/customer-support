import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRole } from "../../api/services/role/role.api"; 
import { getAllPermissions } from '../../api/services/permission/permission.api';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
import Cookies from 'js-cookie';

const CreateRole = () => {
 const navigate = useNavigate();
 const [roleName, setRoleName] = useState('');
 const [selectedPermissions, setSelectedPermissions] = useState([]);
 const [permissions, setPermissions] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [Success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

 useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const userEmail = Cookies.get('userEmail');
        const fetchedPermissions = await getAllPermissions(userEmail);
        setPermissions(fetchedPermissions);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching permissions:', error);
        setIsLoading(false);
      }
    };

    fetchPermissions();
 }, []);

 const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPermissions(prev => {
      if (checked) {
        return [...prev, parseInt(value)];
      } else {
        return prev.filter(id => id !== parseInt(value));
      }
    });
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData = {
      name: roleName,
      permissions: selectedPermissions, // This should be an array of permission IDs
    };
    if (!roleName||selectedPermissions.length === 0) {
      setError('Please select at least one permission');
      return;
    }
    try {
      const response = await createRole(roleData);
      if (response.status === 200) {
        setSuccess(true);
      }
      else {
        setError('An error occurred while creating the role');
      }
    } catch (error) {
      console.error("Error creating role:", error);
    }
 };
 const handelCancel = () => {
  navigate('/RolesList'); // Redirect to roles page or wherever you want after successful creation
  };

 if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
 }

 return (
  <div className="p-4 sm:ml-64 w-full flex-col justify-start items-center">
  <div className="w-10/12 mx-auto max-w-6xl">
    <div className="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 mx-auto">
      <div className="p-4 col-span-6 md:col-span-4">
        <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
          <div className="col-span-2">
                <h1 className="text-3xl m-10 font-bold text-gray-800">Create Role</h1>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="roleName" className="block text-sm font-medium leading-6 text-blue-900">Role Name:</label>
                <div className="mt-2">
                 <input type="text" id="roleName" autoComplete="off" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                 />
                </div>
              </div>
              <div className="col-span-2">
                <div className="mt-4 text-blue-900">Permissions:</div>
                {permissions.map((permission) => (
                 <div key={permission.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`permission-${permission.id}`}
                      value={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={handlePermissionChange}
                      className="mr-2"
                    />
                    <label htmlFor={`permission-${permission.id}`}>{permission.name} - {permission.description}</label>
                 </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handelCancel}>Cancel</button>
                <button type="submit" className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {Success &&< SuccessAlert message="Role created successfully" />}
      {error && <ErrorAlert message={error} />  }
    </div>
 );
};

export default CreateRole;