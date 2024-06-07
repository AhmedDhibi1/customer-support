import React, { useState } from 'react';

const ErrorAlert = ({ message }) => {
 const [isVisible, setIsVisible] = useState(true);

 const handleClose = () => {
    setIsVisible(false);
 };

 if (!isVisible) {
    return null;
 }

 return (
    <div className="fixed bottom-0 right-0 m-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-64" role="alert">
      <button
        type="button"
        className="float-right font-bold text-red-700 hover:text-red-500"
        onClick={handleClose}
      >
        &times;
      </button>
      <p className="font-bold">Error!</p>
      <p>{message}</p>
    </div>
 );
};

export default ErrorAlert;