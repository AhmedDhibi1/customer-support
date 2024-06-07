import { axiosInstance } from "../../axios";
const basePath = "/roles";

const createRole = async (roleData) => {
    try {
       const response = await axiosInstance.post(`${basePath}/create`, roleData);
       console.log("URL:", `${basePath}/create`);
       console.log("Request Data:", roleData);
       console.log("Response:", response);
       if (response.status === 200) {
         console.log("Role created successfully");
         // Assuming the response contains the created role's ID
         const roleId = response.data.role.id;
   
         // Add permissions to the role
         for (const permissionId of roleData.permissions) {
           await addPermissionToRole(roleId, permissionId);
         }
   
         console.log("Permissions added to role successfully");
         return response;
       } else {
         console.error("Failed to create role.");
       }
    } catch (error) {
       console.error("Error creating role:", error.message);
    }
   };
   

const getAllRoles = async () => {
 try {
    const response = await axiosInstance.get(`${basePath}/getAll`);
    console.log("Response:", response.data);
    return response.data;
 } catch (error) {
    console.error("Error fetching roles:", error.message);
 }
};

const getRoleById = async (id) => {
 try {
    const response = await axiosInstance.get(`${basePath}/${id}`);
    console.log("Response:", response.data);
    return response.data;
 } catch (error) {
    console.error("Error fetching role:", error.message);
 }
};

const updateRole = async (id, roleData) => {
 try {
    const response = await axiosInstance.put(`${basePath}/${id}`, roleData);
    console.log("URL:", `${basePath}/${id}`);
    console.log("Request Data:", roleData);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Role updated successfully");
    } else {
      console.error("Failed to update role.");
    }
    return response;
 } catch (error) {
    console.error("Error updating role:", error.message);
 }
};

const deleteRole = async (id) => {
 try {
    const response = await axiosInstance.delete(`${basePath}/${id}`);
    console.log("URL:", `${basePath}/${id}`);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Role deleted successfully");
    } else {
      console.error("Failed to delete role.");
    }
    return response;
 } catch (error) {
    console.error("Error deleting role:", error.message);
 }
};

const addPermissionToRole = async (roleId, permissionId) => {
 try {
    const response = await axiosInstance.post(`${basePath}/${roleId}/permissions/${permissionId}`);
    console.log("URL:", `${basePath}/${roleId}/permissions/${permissionId}`);
    console.log("Response addPermissionToRole:", response);
    if (response.status === 200) {
      console.log("Permission added to role successfully");
    } else {
      console.error("Failed to add permission to role.");
    }
      return response;
 } catch (error) {
    console.error("Error adding permission to role:", error.message);
 }
};

const getPermissionsOfRole = async (roleId) => {
   try {
      const response = await axiosInstance.get(`${basePath}/${roleId}/permissions`);
      console.log("URL:", `${basePath}/${roleId}/permissions`);
      console.log("Response getPermissionsOfRole :", response);
      if (response.status === 200) {
        console.log("Permissions retrieved successfully");
        return response.data; // Assuming the permissions are returned in the response body
      } else {
        console.error("Failed to retrieve permissions.");
      }
   } catch (error) {
      console.error("Error retrieving permissions:", error.message);
   }
  };

  const removePermissionFromRole = async (roleId, permissionId) => {
   try {
      const response = await axiosInstance.delete(`${basePath}/${roleId}/permissions/${permissionId}`);
      console.log("URL:", `${basePath}/${roleId}/permissions/${permissionId}`);
      console.log("Response removePermissionFromRole :", response);
      if (response.status === 200) {
        console.log("Permission removed from role successfully");
      } else {
        console.error("Failed to remove permission from role.");
      }
   } catch (error) {
      console.error("Error removing permission from role:", error.message);
   }
  };


export { createRole, getAllRoles, getRoleById, updateRole, deleteRole, addPermissionToRole, getPermissionsOfRole, removePermissionFromRole};