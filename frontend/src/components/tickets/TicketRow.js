// TicketRow.js
import React from 'react';
import { Link } from 'react-router-dom';

const TicketRow = ({ ticket, userId }) => {
 return (
<tr key={ticket.id} >
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.title}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.description}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.status}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.priority}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.agentId ? ticket.agentId : 'Not affected yet!'} </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {ticket.date ? ticket.date.split('T')[0] : 'No date available'}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {ticket.uploadFile ? (
          <a href={ticket.uploadFile} target="_blank" rel="noopener noreferrer">
            {ticket.uploadFile.split('/').pop()}
          </a>
        ) : (
          'No file uploaded'
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.TicketItemId}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ticket.UserId}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`/chat/${ticket.id}`} className="bg-gray-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
          Chat
        </Link>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex justify-end">
          <button className="bg-blue-700 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
            <Link to={`/EditTicket/${ticket.id}`} className="flex items-center">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
              </svg>
              <span className="ml-2">Edit</span>
            </Link>
          </button>
          <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ml-4">
            <Link to={`/DeleteTicket/${ticket.id}`} className="flex items-center">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
              </svg>
              <span className="ml-2">Delete</span>
            </Link>
          </button>
        </div>
      </td>
    </tr>
 );
};

export default TicketRow;