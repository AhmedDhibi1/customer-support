import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPermission } from "../../api/services/permission/permission.api";
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';


const CreatePermission = () => {
 const navigate = useNavigate();
 const [permissionName, setPermissionName] = useState('');
 const [permissionDescription, setPermissionDescription] = useState('');
  const [error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const permissionData = {
      name: permissionName,
      description: permissionDescription,
    };
    if (!permissionName || !permissionDescription) {
      setError('Please fill all fields');
      return;
    }
    try {
      const response = await createPermission(permissionData);
      if (response.status === 200) { 
        setSuccess(true);
        navigate('/PermissionsList');
      }
    } catch (error) {
      setError('Error creating permission');
      console.error("Error creating permission:", error);
    }
 };
 const handelCanel = () => {
  navigate('/PermissionsList');
 };

 return (
    <div className="p-4 sm:ml-64 w-full flex-col justify-start items-center">
      <div className="w-10/12 mx-auto max-w-6xl">
        <div className="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 mx-auto">
          <div className="p-4 col-span-6 md:col-span-4">
            <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="col-span-2">
                <h1 className="text-3xl m-10 font-bold text-gray-800">Create Permission</h1>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="permissionName" className="block text-sm font-medium leading-6 text-blue-900">Permission Name:</label>
                <div className="mt-2">
                 <input type="text" id="permissionName" autoComplete="off" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4"
                    value={permissionName}
                    onChange={(e) => setPermissionName(e.target.value)}
                    required
                 />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="permissionDescription" className="block text-sm font-medium leading-6 text-blue-900">Permission Description:</label>
                <div className="mt-2">
                 <input type="text" id="permissionDescription" autoComplete="off" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4"
                    value={permissionDescription}
                    onChange={(e) => setPermissionDescription(e.target.value)}
                    required
                 />
                </div>
                </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handelCanel}>Cancel</button>
                <button type="submit" className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {Success &&< SuccessAlert message="Permission created successfuly" />}
      {error && <ErrorAlert message={error} />  }
    </div>
 );
};

export default CreatePermission;