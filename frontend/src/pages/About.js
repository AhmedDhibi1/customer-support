import React, { useState } from 'react';
const About = () => {
  const [emails, setEmails] = useState([
    { id: 1, sender: 'john@example.com', subject: 'Regarding Your Recent Order', timestamp: '2 hours ago', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', isRead: false },
    { id: 2, sender: 'info@example.com', subject: 'Feedback on Our Services', timestamp: '1 day ago', body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', isRead: false },
    { id: 3, sender: 'support@example.com', subject: 'Your Password Reset Request', timestamp: '3 days ago', body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', isRead: true },
    { id: 4, sender: 'sales@example.com', subject: 'Special Offer Inside', timestamp: '1 week ago', body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isRead: true },
    { id: 5, sender: 'marketing@example.com', subject: 'Upcoming Webinar Invitation', timestamp: '2 weeks ago', body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', isRead: false },
    // Add more sample emails here as needed
  ]);
  const toggleReadStatus = (emailId) => {
    setEmails(prevEmails => {
      return prevEmails.map(email => {
        if (email.id === emailId) {
          return { ...email, isRead: !email.isRead };
        }
        return email;
      });
    });
  };
  return (
    <div className="p-4 sm:ml-64">
<div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {emails.map(email => (
            <li 
              key={email.id} 
              className={`p-4 cursor-pointer ${email.isRead ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`} 
              onClick={() => toggleReadStatus(email.id)}
            >
              <div className="flex items-center">
              
                <div>
                  <div className="font-bold">{email.sender}</div>
                  <div className="text-sm">{email.subject}</div>
                  <div className="text-xs text-gray-600">{email.body.substr(0, 100)}...</div>
                </div>
              </div>
              <div className="text-sm">{email.timestamp}</div>
            </li>
          ))}
        </ul>
      </div>
</div>
  )
}

export default About