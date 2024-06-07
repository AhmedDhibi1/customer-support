import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicket } from "../../api/services/ticket/ticket.api"; // Adjust the import path as necessary

const EditTicket = () => {
 const navigate = useNavigate();
 const { id: ticketId } = useParams();
 const titleRef = useRef(null);
 const descriptionRef = useRef(null);
 const statusRef = useRef(null);
 const priorityRef = useRef(null);
 const agentIdRef = useRef(null); // New ref for Agent ID
 const itemIdRef = useRef(null); // New ref for Item ID
 const fileInputRef = useRef(null);
 const [error, setError] = useState(null);
 const [ticket, setTicket] = useState({});

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTicketById(ticketId);
        setTicket(response);
        console.log('Ticket:', response);
        titleRef.current.value = response.title;
        descriptionRef.current.value = response.description;
        statusRef.current.value = response.status;
        priorityRef.current.value = response.priority;
        agentIdRef.current.value = response.agentId;
        itemIdRef.current.value = response.TicketItemId;
        itemIdRef.current.value = response.TicketItemId;
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
 }, [ticketId]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('error:', error);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', titleRef.current.value);
      formData.append('description', descriptionRef.current.value);
      formData.append('status', statusRef.current.value);
      formData.append('priority', priorityRef.current.value);
      formData.append('agentId', agentIdRef.current.value);
      formData.append('TicketItemId', itemIdRef.current.value); 
      if (fileInputRef.current.files[0]) {
        formData.append('uploadFile', fileInputRef.current.files[0]);
      }
      if (!titleRef.current.value || !descriptionRef.current.value || !priorityRef.current.value  || !itemIdRef.current.value) {  
        setError('Please fill in all fields');  
        return;
        };
      const response = await updateTicket(ticketId, formData);
      if (response.status === 200) {
        console.log("Ticket updated successfully");
        navigate('/TicketsList'); // Redirect to the tickets page or another page as needed
      } else {
        setError('Error updating ticket');
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
              <p className={error ? "error font-bold p-2 mb-2" : "offscreen"} aria-live="assertive">{error}</p>
              <h1 className="text-gradient flex flex-col justify-center items-center text-3xl p-5 m-10 font-bold text-blue-900">Edit Ticket</h1>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-blue-900">Title</label>
              <div className="mt-2">
                <input type="text" id="title" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={titleRef} required />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-blue-900">Description</label>
              <div className="mt-2">
                <textarea id="description" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={descriptionRef} required></textarea>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="agentId" className="block text-sm font-medium leading-6 text-blue-900">Agent ID</label>
              <div className="mt-2">
                <input type="text" id="agentId" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={agentIdRef} required />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="itemId" className="block text-sm font-medium leading-6 text-blue-900">Item ID</label>
              <div className="mt-2">
                <input type="text" id="itemId" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={itemIdRef} required />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-blue-900">Status</label>
              <div className="mt-2">
                <select id="status" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={statusRef} required>
                 <option value="">Select Status</option>
                 <option value="open">Open</option>
                 <option value="in_progress">In Progress</option>
                 <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="priority" className="block text-sm font-medium leading-6 text-blue-900">Priority</label>
              <div className="mt-2">
                <select id="priority" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={priorityRef} required>
                 <option value="">Select Priority</option>
                 <option value="low">Low</option>
                 <option value="medium">Medium</option>
                 <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="fileInput" className="block text-sm font-medium leading-6 text-blue-900">Upload File</label>
              <div className="mt-2">
                <input type="file" id="fileInput" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={fileInputRef} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" className="rounded-md bg-gradient-to-r from-blue-900 to-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Update Ticket</button>
          </div>
        </div>
      </div>
    </div>
 </div>
 );
};

export default EditTicket;