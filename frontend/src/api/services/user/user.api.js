import {axiosInstance} from "../../axios";
const basePath="/users";

const checkPermission = async (permissionName) => {
  try {
      const response = await axiosInstance.get(
      `${basePath}/checkPermission/${permissionName}`);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Permission checked successfully");
      return response.data.hasPermission;
    } else {
console.error("Failed to check permission");
 }
  } catch (error) {
console.error("Error checking permission:", error.message);
}
};

const authenticate = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${basePath}/authenticate`, {
      email: email,
      password: password,
    });
    
    console.log("URL:", `${basePath}/authenticate`);
    console.log("Request Data:", { email, password });
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("User logged in successfully");
      return response;
    } else {
      console.error("Username or password is incorrect.");
    }
  } catch (error) {
    console.error("Error auth user:", error.message);
  }
};
  const register = async (firstName,lastName,email,password,homeAddress) => {
    try {
      const response = await axiosInstance.post(`${basePath}/register`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password:password,
        homeAddress: homeAddress
      });
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("User created in successfully");
        return response.status;
      } else {
        console.error('Invalid user parameters provided');
        return response.status;
       
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  const getAllUsers = async (email) => {
    try {
       const response = await axiosInstance.get(`${basePath}/getAll`);
       console.log("Response:", response.data);
       return response.data;
    } catch (error) {
       throw new Error(`Error fetching user: ${error}`);
    }
   };
   
  const current = async () => {
    try {
      const response = await axiosInstance.get(`${basePath}/current`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  };
  const getById = async (id) => {
    try {
      const response = await axiosInstance.get(`${basePath}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
    };
const update = async (id,firstName,lastName,email,password,homeAddress,roleId) => {
    try {
        const response = await axiosInstance.put(
        `${basePath}/${id}`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password:password,
            homeAddress: homeAddress,
            roleId:roleId
          });
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("user updated successfully");
        
      } else {
        console.error("Failed to update user");
      }
      return response;
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
    
  };
  const _delete = async (id) => {
    try {
      const response = await axiosInstance.delete(`${basePath}/${id}`);
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("user deleted successfully");
          return response;
      } else {
        console.error("Failed to delete user");
        return response;
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };




  export {checkPermission,authenticate,getAllUsers,register,current,getById,update,_delete};