// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
