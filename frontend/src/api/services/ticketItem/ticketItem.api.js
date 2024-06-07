// Assuming this is in a file named ticketItem.api.js
import { axiosInstance } from "../../axios";
const basePath = "/ticketItems";

const createTicketItem = async (ticketItemData) => {
 try {
    const response = await axiosInstance.post(`${basePath}/create`, ticketItemData);
    console.log("URL:", `${basePath}/create`);
    console.log("Request Data:", ticketItemData);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("TicketItem created successfully");
      return response;
    } else {
      console.error("Failed to create TicketItem.");
    }
 } catch (error) {
    console.error("Error creating TicketItem:", error.message);
 }
};

const getAllTicketItems = async () => {
 try {
    const response = await axiosInstance.get(`${basePath}/getAll`);
    console.log("Response:", response.data);
    return response.data;
 } catch (error) {
    console.error("Error fetching TicketItems:", error.message);
 }
};

const getTicketItemById = async (id) => {
 try {
    const response = await axiosInstance.get(`${basePath}/${id}`);
    console.log("Response:", response.data);
    return response.data;
 } catch (error) {
    console.error("Error fetching TicketItem:", error.message);
 }
};

const updateTicketItem = async (id, ticketItemData) => {
 try {
    const response = await axiosInstance.put(`${basePath}/${id}`, ticketItemData);
    console.log("URL:", `${basePath}/${id}`);
    console.log("Request Data:", ticketItemData);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("TicketItem updated successfully");
    } else {
      console.error("Failed to update TicketItem.");
    }
    return response;
 } catch (error) {
    console.error("Error updating TicketItem:", error.message);
 }
};

const deleteTicketItem = async (id) => {
 try {
    const response = await axiosInstance.delete(`${basePath}/${id}`);
    console.log("URL:", `${basePath}/${id}`);
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("TicketItem deleted successfully");
    } else {
      console.error("Failed to delete TicketItem.");
    }
    return response;
 } catch (error) {
    console.error("Error deleting TicketItem:", error.message);
 }
};

export { createTicketItem, getAllTicketItems, getTicketItemById, updateTicketItem, deleteTicketItem };
