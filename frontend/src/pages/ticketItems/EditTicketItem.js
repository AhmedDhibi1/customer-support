import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketItemById, updateTicketItem } from "../../api/services/ticketItem/ticketItem.api";
import SuccessAlert from '../../components/SuccessAlert'; // Import SuccessAlert
import ErrorAlert from '../../components/ErrorAlert'; // Import ErrorAlert

const EditTicketItem = () => {
 const navigate = useNavigate();
 const { id: ticketItemId } = useParams();
 const [type, setType] = useState('');
 const [name, setName] = useState('');
 const [ref, setRef] = useState('');
 const [Success, setSuccess] = useState(null); // State for success message
 const [error, setError] = useState(null); // State for error message

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTicketItemById(ticketItemId);
        setType(response.type);
        setName(response.name);
        setRef(response.ref);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
 }, [ticketItemId]);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketItemData = {
      type,
      name,
      ref,
    };
    if(!type || !name || !ref) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const response = await updateTicketItem(ticketItemId, ticketItemData);
      if (response.status === 200) {
        setSuccess(true); // Set success message
        setTimeout(() => navigate('/TicketItemList'), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setError(error.message); // Set error message
      console.error("Error updating ticket item:", error);
    }
 };

 return (
    <div className="p-4 sm:ml-64 w-full flex-col justify-start items-center">
      <div className="w-10/12 mx-auto max-w-6xl">
        <div className="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 mx-auto">
          <div className="p-4 col-span-6 md:col-span-4">
            <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="col-span-2">
                <h1 className="text-3xl m-10 font-bold text-gray-800">Edit Ticket Item</h1>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-blue-900">Type:</label>
                <div className="mt-2">
                 <input type="text" id="type" autoComplete="off" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                 />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-blue-900">Name:</label>
                <div className="mt-2">
                 <input type="text" id="name" autoComplete="off" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                 />
                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="ref" className="block text-sm font-medium leading-6 text-blue-900">Ref:</label>
                <div className="mt-2">
                 <input type="text" id="ref" autoComplete="off" className="block w-full rounded-md border-blue-900 border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 pl-4"
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    required
                 />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/TicketItemList')}>Cancel</button>
                <button type="submit" className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={handleSubmit}>Update</button>
              </div>
            </div>
            {Success && <SuccessAlert message="Ticket item updated successfully" />}
            {error && <ErrorAlert message={error} />}
          </div>
        </div>
      </div>
    </div>
 );
};

export default EditTicketItem;
