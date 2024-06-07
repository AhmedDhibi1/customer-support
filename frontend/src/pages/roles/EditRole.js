import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoleById, updateRole, addPermissionToRole, getPermissionsOfRole, removePermissionFromRole } from "../../api/services/role/role.api";
import { getAllPermissions } from '../../api/services/permission/permission.api';
import SuccessAlert from '../../components/SuccessAlert'; // Ensure this import is correct
import ErrorAlert from '../../components/ErrorAlert'; // Ensure this import is correct

const EditRole = () => {
 const navigate = useNavigate();
 const { id: roleId } = useParams();
 const roleNameRef = useRef(null);
 const [error, setError] = useState(null);
 const [success, setSuccess] = useState(null); // State for success message
 const [role, setRole] = useState({});
 const [rolePermissions, setRolePermissions] = useState([]);
 const [permissions, setPermissions] = useState([]);
 const [selectedPermissions, setSelectedPermissions] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const roleResponse = await getRoleById(roleId);
        const permissionsResponse = await getAllPermissions();
        const rolePermissions = await getPermissionsOfRole(roleId);
        setRole(roleResponse);
        setPermissions(permissionsResponse);
        setSelectedPermissions(rolePermissions.map(permission => permission.id));
        setRolePermissions(rolePermissions.map(permission => permission.id));
        roleNameRef.current.value = roleResponse.name;
        roleNameRef.current.placeholder = roleResponse.name;
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
 }, [roleId]);

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
    setError(null);
    setSuccess(null);
    if (!roleNameRef.current.value || selectedPermissions.length === 0) {
      setError('Please select at least one permission');
      return;
    }
    try {
      const response = await updateRole(
        roleId,
        {name:roleNameRef.current.value}
      );
      if (response.status === 200) {
        // Handle adding or removing permissions
        const permissionsToAdd = selectedPermissions.filter(id => !rolePermissions.includes(id));
        const permissionsToRemove = rolePermissions.filter(id => !selectedPermissions.includes(id));

        for (const permissionId of permissionsToAdd) {
          await addPermissionToRole(roleId, permissionId);
        }
        for (const permissionId of permissionsToRemove) {
          await removePermissionFromRole(roleId, permissionId);
        }
        setSuccess('Role updated successfully'); // Set success message
        navigate('/RolesList'); // Redirect to roles page or wherever you want after successful update
      } else {
        setError('Error updating role');
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
                <h1 className="text-3xl m-10 font-bold text-gray-800">Edit Role</h1>
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="roleName" className="block text-sm font-medium leading-6 text-blue-900">Role Name</label>
                <div className="mt-2">
                 <input type="text" id="roleName" autoComplete="off" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={roleNameRef} required />
                </div>
              </div>

              <div className="col-span-2">
                <label htmlFor="permissions" className="block text-sm font-medium leading-6 text-blue-900">Permissions</label>
                <div className="mt-2">
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
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>navigate('/RolesList')}>Cancel</button>
              <button type="submit" className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
      {success && <SuccessAlert message={success} />} 
      {error && <ErrorAlert message={error} />}
    </div>
 );
};

export default EditRole;