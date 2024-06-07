import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { deletePermission } from '../../api/services/permission/permission.api'; // Ensure you have this function implemented in your API service

const DeletePermission = () => {
    const navigate = useNavigate();
    const { id: permissionId } = useParams();
    const [error, setError] = useState(null);

    const onConfirm = async () => {
        try {
            const response = await deletePermission(permissionId);
            console.log("Response:", response);
            if (response.status === 200) {
              console.log("Permission deleted successfully");
              navigate('/PermissionsList'); // Redirect to permissions page or wherever you want after successful deletion
            } else {
              console.error("Failed to delete permission");
              setError('Failed to delete permission');
            }
          } catch (error) {
            console.error("Error deleting permission:", error.message);
            setError('Error deleting permission');
          }
    };

    const onCancel = () => {    
        navigate('/PermissionsList'); // Redirect to permissions page or wherever you want when cancelling
    };

    return (
    <div>
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-filter backdrop-blur-md" aria-hidden="true"></div>
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Delete Permission
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                            Are you sure you want to proceed?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={onConfirm}>
                    Confirm
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>

    );
};

export default DeletePermission;