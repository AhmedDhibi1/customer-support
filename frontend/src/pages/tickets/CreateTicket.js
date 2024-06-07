import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { createTicket} from "../../api/services/ticket/ticket.api"; 
import { getAllTicketItems } from '../../api/services/ticketItem/ticketItem.api'; 
import SuccessAlert from '../../components/SuccessAlert'; // Import SuccessAlert
import ErrorAlert from '../../components/ErrorAlert'; // Import ErrorAlert

const CreateTicket = () => {
 const navigate = useNavigate();
 const titleRef = useRef(null);
 const descriptionRef = useRef(null);
 const statusRef = useRef(null);
 const priorityRef = useRef(null);
 const fileInputRef = useRef(null);
 const ticketItemRef = useRef(null); // Reference for the ticket item dropdown
 const [error, setError] = useState(null);
 const [Success, setSuccess] = useState(null);
 const [ticketItems, setTicketItems] = useState([]); // State for fetched ticket items
 const [selectedTicketItem, setSelectedTicketItem] = useState(null); // State for selected ticket item

 useEffect(() => {
    const fetchTicketItems = async () => {
      try {
        const fetchedTicketItems = await getAllTicketItems();
        setTicketItems(fetchedTicketItems);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch ticket items:", err);
      }
    };

    fetchTicketItems();
 }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', titleRef.current.value);
      formData.append('description', descriptionRef.current.value);
      formData.append('status', 'open');
      formData.append('priority', priorityRef.current.value);
      formData.append('uploadFile', fileInputRef.current.files[0]);
      formData.append('TicketItemId', selectedTicketItem);
if (!titleRef.current.value || !descriptionRef.current.value || !priorityRef.current.value  || !selectedTicketItem) {  
setError('Please fill in all fields');  
return;
};
      const response = await createTicket(formData);
      if (response) {
        setSuccess(true);
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
            <div className="col-span-2">
                <h1 className="text-3xl m-10 font-bold text-gray-800">Create Ticket</h1>
              </div>
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
        <label htmlFor="ticketItem" className="block text-sm font-medium leading-6 text-blue-900">Ticket Item</label>
        <div className="mt-2">
          <select id="ticketItem" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4" ref={ticketItemRef} onChange={(e) => setSelectedTicketItem(e.target.value)} required>
            <option value="">Select Ticket Item</option>
            {ticketItems.map((item) => (
              <option key={item.id} value={item.id}>{item.name} -ref: {item.ref}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1">
      <label htmlFor="description" className="block text-sm font-medium leading-6 text-blue-900">Create New Ticket Item</label>
      <button type="submit" className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={() => navigate('/CreateTicketItem')}>Create Ticket Item</button>
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
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900"onClick={()=>window.history.back()}>Cancel</button>
            <button type="submit" className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Create Ticket</button>
          </div>
        </div>
      </div>
    </div>
    {Success && <SuccessAlert message="Ticket item updated successfully" />}
    {error && <ErrorAlert message={error} />}
 </div>
 );
};

export default CreateTicket;