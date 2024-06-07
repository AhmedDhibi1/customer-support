import { axiosInstance, formDataAxiosInstance } from "../../axios";
const basePath = "/tickets";

const createTicket = async (formData) => {
    try {
        const response = await formDataAxiosInstance.post(`${basePath}/create`,formData);

    console.log("URL:", `${basePath}/create`);
    console.log("Request Data:", { title, description, status, priority });
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Ticket created successfully");
      
    } else {
      console.error("Failed to create ticket.");
    }
    return response;
 } catch (error) {
    console.error("Error creating ticket:", error.message);
 }
};

const getAllTickets = async () => {
 try {
    const response = await formDataAxiosInstance.get(`${basePath}/getAll`);
    console.log("Response getAllTickets :", response.data);
    return response.data;
 } catch (error) {
    throw new Error(`Error fetching tickets: ${error}`);
 }
};

const getTicketById = async (id) => {
 try {
    const response = await formDataAxiosInstance.get(`${basePath}/${id}`);
    return response.data;
 } catch (error) {
    throw new Error(`Error fetching ticket: ${error}`);
 }
};

const updateTicket = async (id, formData) => {
 try {
    const response = await formDataAxiosInstance.put(`${basePath}/${id}`, formData);

    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Ticket updated successfully");
    } else {
      console.error("Failed to update ticket");
    }
    return response;
 } catch (error) {
    console.error("Error updating ticket:", error.message);
 }
};

const deleteTicket = async (id) => {
 try {
    const response = await axiosInstance.delete(`${basePath}/${id}`);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Ticket deleted successfully");
    } else {
      console.error("Failed to delete ticket");
    }
    return response;
 } catch (error) {
    console.error("Error deleting ticket:", error.message);
 }
};

export { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket };