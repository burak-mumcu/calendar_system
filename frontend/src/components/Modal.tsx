import React from 'react';
import { AcademicEvent } from '../lib/types';
import { Button } from './Button';


interface ModalProps {
  event: AcademicEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ event, isOpen, onClose }) => {
  const isAdmin = localStorage.getItem('role') === 'admin' ? true : false;
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{event.event}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Güz Yarıyılı</h4>
            <p className="text-sm text-gray-600">
              Başlangıç: {event.fallStart}
              <br />
              Bitiş: {event.fallEnd}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Bahar Yarıyılı</h4>
            <p className="text-sm text-gray-600">
              Başlangıç: {event.springStart}
              <br />
              Bitiş: {event.springEnd}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
