import React, { useState, useEffect } from 'react';
import { getAllTickets } from '../../api/services/ticket/ticket.api'; 
import { getById } from '../../api/services/user/user.api';
import { Link } from 'react-router-dom';
import TicketRow from '../../components/tickets/TicketRow';
import Cookies from 'js-cookie';

const TicketsList = () => {
 const [tickets, setTickets] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const userId = Cookies.get('userId');
 const [roleId, setRoleId] = useState(0);
 const [searchTerm, setSearchTerm] = useState(''); // State for search term

 useEffect(() => {
    getById(userId).then((response) => {
      console.log(response.RoleId);
      setRoleId(response.RoleId);
    });
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTickets(); 
        console.log('Tickets:', fetchedTickets);
        setTickets(fetchedTickets);
        console.log('Tickets:', fetchedTickets);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setIsLoading(false);
      }
    };

    fetchTickets();
 }, []);

 // Function to filter tickets based on search term
 const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.priority.toLowerCase().includes(searchTerm.toLowerCase())
 );

 if (isLoading) {
    return <p>Loading...</p>;
 }

 return (
    <div className="p-4 sm:ml-64">
      <div className="bg-white p-8 rounded-md w-full">
        <div className="flex items-center justify-between pb-6">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block"
              type="text"
              placeholder="search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
            />
          </div>
          
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Agent ID</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Upload File</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticket Item ID</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                 (roleId === 1 && ticket.UserId == userId) ||
                 (roleId === 2 && ticket.agentId == userId) ||
                 (roleId === 3 || roleId === 4) ? (
                    <TicketRow key={ticket.id} ticket={ticket} userId={userId} />
                 ) : null
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
 );
};

export default TicketsList;