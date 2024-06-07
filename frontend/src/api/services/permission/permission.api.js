import { axiosInstance, formDataAxiosInstance } from "../../axios";

const basePath = "/permissions";

const createPermission = async (permissionData) => {
 try {
    const response = await axiosInstance.post(`${basePath}/create`, permissionData);
    console.log("URL:", `${basePath}/create`);
    console.log("Request Data:", permissionData);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Permission created successfully");
      
    } else {
      console.error("Failed to create permission.");
    }
    return response;
 } catch (error) {
    console.error("Error creating permission:", error.message);
 }
};

const getAllPermissions = async () => {
 try {
    const response = await axiosInstance.get(`${basePath}/getAll`);
    console.log("Response:", response);
    return response.data;
 } catch (error) {
    console.error("Error fetching permissions:", error.message);
 }
};

const getPermissionById = async (id) => {
 try {
    const response = await axiosInstance.get(`${basePath}/${id}`);
    console.log("Response:", response.data);
    return response.data;
 } catch (error) {
    console.error("Error fetching permission:", error.message);
 }
};

const updatePermission = async (id, permissionData) => {
 try {
    const response = await axiosInstance.put(`${basePath}/${id}`, permissionData);
    console.log("URL:", `${basePath}/${id}`);
    console.log("Request Data:", permissionData);
    console.log("Response:", response);
   
    if (response.status === 200) {
      console.log("Permission updated successfully");
    } else {
      console.error("Failed to update permission.");
    }
    return response;
 } catch (error) {
    console.error("Error updating permission:", error.message);
 }
};

const deletePermission = async (id) => {
 try {
    const response = await axiosInstance.delete(`${basePath}/${id}`);
    console.log("URL:", `${basePath}/${id}`);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Permission deleted successfully");
    } else {
      console.error("Failed to delete permission.");
    }
    return response;
 } catch (error) {
    console.error("Error deleting permission:", error.message);
 }
};

export { createPermission, getAllPermissions, getPermissionById, updatePermission, deletePermission };