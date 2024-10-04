import React from 'react';



const ShowModal = ({ onClose, onSubscribe }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="mb-4">Stay updated with our latest news and offers.</p>

        <button
          onClick={onSubscribe}

          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Subscribe Now
        </button>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowModal;