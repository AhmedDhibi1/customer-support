import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { animateScroll } from 'react-scroll';

const Chat = ({ socket }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { id: chatId } = useParams();
    const userId = Cookies.get('userId');
    const chatPopupRef = useRef();

    useEffect(() => {
        const handleNewMessage = (messageObject) => {
            setMessages((prevMessages) => [...prevMessages, messageObject]);
            scrollChatToBottom();
        };

        socket.on("previousMessages", (messages) => {setMessages(messages);console.log(messages);});
        socket.on('newMessage', handleNewMessage);
        socket.emit('joinChat', chatId);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, chatId]);

    const sendMessage = (e) => {
        e.preventDefault();
        const messageObject = {
            message: message,
            ticketId: chatId,
            senderId: userId,
            createdAt: new Date(),
        };
        socket.emit('sendMessage', messageObject);
        setMessage('');
    };

    const scrollChatToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: 'chatMessages',
            duration: 300,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-filter backdrop-blur-md"></div>
            <div ref={chatPopupRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl z-10">
                {/* Chat header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Chat for ticket {chatId}</h2>
                    <button onClick={() => {window.history.back(); }} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Chat messages */}
                <div id="chatMessages" className="mb-4 max-h-96 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                        {messages.map((messageObject, index) => (
                            <li key={index} className="py-4  justify-between">
                                <div className={`flex ${messageObject.senderId == userId ?  'justify-end':'justify-start'}`}>
                                   
                                    <div>
                                    <p>{messageObject.createdAt}</p>
                                    <div className={`flex ${messageObject.senderId == userId ? 'justify-end':'justify-start'}`}>                                    
                                    <div className="flex-shrink-0 mr-3">
                                    {messageObject.senderId != userId && <img className="h-6 w-6 rounded-full" src="https://via.placeholder.com/40" alt="" />}
                                    </div>
                                    <div className={`max-w-xs px-4 py-2 rounded-lg ${messageObject.senderId == userId ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'}`}>
                                        <p>{messageObject.message}</p>
                                    </div>
                                    <div className="flex-shrink-0 ml-3">
                                    {messageObject.senderId == userId && <img className="h-6 w-6 rounded-full" src="https://via.placeholder.com/40" alt="" />}
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Chat input */}
                <form onSubmit={sendMessage} className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Type your message..."
                    />
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;