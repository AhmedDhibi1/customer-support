
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { animateScroll } from 'react-scroll';
import { axiosInstance } from "../../api/axios"; // Make sure to import axiosInstance

const Chatbot = () => {
    const [messages, setMessages] = useState([{
        senderId: 'chatbot',
        message: 'hello how can i help you?',
        createdAt: new Date().toLocaleTimeString(),
    }]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State for loading animation
    const userId = Cookies.get('userId'); // Assuming you have a userId stored in cookies

    const scrollChatToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: 'chatMessages',
            duration: 300,
        });
    };

    const sendMessage = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
        const newMessage = {
            senderId: userId,
            message: message,
            createdAt: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, newMessage]);
        setMessage('');
        scrollChatToBottom();

        try {
            const response = await axiosInstance.post('/chatbot', { prompt: message });
            const chatbotMessage = {
                senderId: 'chatbot', 
                message: response.data,
                createdAt: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage, chatbotMessage]);
            scrollChatToBottom();
        } catch (error) {
            console.error('Error occurred:', error);
            const errorMessage = {
                senderId: 'chatbot',
                message: 'Error occurred. Please try again later.',
                createdAt: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage, errorMessage]);
            scrollChatToBottom();
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        
            <div style={{boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(50 50 50 / 0.05);'}}
                className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
                <div className="flex flex-col space-y-1.5 pb-6">
                    <h2 className="font-semibold text-lg tracking-tight">Chatbot 🤖</h2>
                    <p className="text-sm text-[#6b7280] leading-3">Powered by ollama llma2 </p>
                </div>
                <div id="chatMessages" className="pr-4 h-[474px] mb-4 max-h-[474px] overflow-y-auto">
                {/* <div className="pr-4 h-[474px]" style={{minWidth: '100%', display: 'table'}}> */}
                    {messages.map((messageObject, index) => (
                        <div className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${messageObject.senderId == userId ? 'justify-end' : 'justify-start'}`}>
                            {messageObject.senderId != userId &&<span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                <div className="rounded-full bg-gray-100 border p-1">
                                    <svg stroke="none" fill="blue-900" strokeWidth="1.5"
                                        viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                                        </path>
                                    </svg>
                                    
                                </div>
                            </span>}
                            <p className="leading-relaxed"><span className="block font-bold text-gray-700">{messageObject.senderId == userId ? 'You' : 'AI'} </span>{messageObject.message}</p>
                            {messageObject.senderId == userId &&<span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                <div className="rounded-full bg-gray-100 border p-1">
                                   
                                    <svg class="w-[31px] h-[31px] text-gray-800 dark:text-blue-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="3" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                </div>
                            </span>}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 my-4 text-gray-600 text-sm justify-start">
                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                <div className="rounded-full bg-blue-100 border p-1">
                                    <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce"></div>
                                </div>
                            </span>
                            <p className="leading-relaxed"><span className="block font-bold text-gray-700">AI</span> Generating response...</p>
                        </div>
                    )}
                </div>
                <div className="flex items-center pt-0">
                    <form onSubmit={sendMessage} className="flex items-center justify-center w-full space-x-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                            placeholder="Type your message"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-gray-800 hover:bg-[#111827E6] h-10 px-4 py-2"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        
    );
};

export default Chatbot;