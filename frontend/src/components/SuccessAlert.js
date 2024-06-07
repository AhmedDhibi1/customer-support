import React, { useState } from 'react';

const SuccessAlert = ({ message }) => {
 const [isVisible, setIsVisible] = useState(true);

 const handleClose = () => {
    setIsVisible(false);
 };

 if (!isVisible) {
    return null;
 }

 return (
    <div className="fixed bottom-0 right-0 m-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-64" role="alert">
      <button
        type="button"
        className="float-right font-bold text-green-700 hover:text-green-500"
        onClick={handleClose}
      >
        &times;
      </button>
      <p className="font-bold">Success!</p>
      <p>{message}</p>
    </div>
 );
};

export default SuccessAlert;