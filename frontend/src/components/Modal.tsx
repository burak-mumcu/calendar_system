import React, { useState, useEffect } from 'react';
import { AcademicEvent } from '../lib/types';
import { getEntityURL } from '../lib/api';
import axios from 'axios';

interface ModalProps {
  event: AcademicEvent | null;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ event, name, isOpen, onClose }) => {
  const isAdmin = localStorage.getItem('role') === 'admin';
  const [isEditing, setIsEditing] = useState(false);
  const [editableEvent, setEditableEvent] = useState<AcademicEvent | null>(event);

  useEffect(() => {
    if (event) {
      setEditableEvent({ ...event });
    }
  }, [event]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableEvent) return;
    setEditableEvent({
      ...editableEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdate = async () => {
    if (!editableEvent) return;

    try {
      const apiUrl = getEntityURL(["calendar", "update"]);
      const payload = {
        event: editableEvent,
        name: name,
      };
      const response = await axios.post(apiUrl, payload);

      if (response.status !== 200) {
        alert("Etkinlik oluşturma başarısız");
      } else {
        alert('Etkinlik başarıyla güncellendi.');
        onClose();
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleDelete = async () => {
    if (!event) return;

    const confirmDelete = window.confirm("Bu etkinliği silmek istediğinizden emin misiniz?");
    if (!confirmDelete) return;

    try {
      const apiUrl = getEntityURL(["calendar", "delete" , "event"]);
      const payload = { eventName: event.event, name: name };
      const response = await axios.post(apiUrl, payload);

      if (response.status === 200) {
        alert("Etkinlik başarıyla silindi.");
        onClose();
      } else {
        alert("Etkinlik silme başarısız.");
      }
    } catch (error) {
      console.error(error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

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
            <input
              type="text"
              name="fallStart"
              value={editableEvent?.fallStart || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg py-2 px-3`}
            />
            <input
              type="text"
              name="fallEnd"
              value={editableEvent?.fallEnd || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg py-2 px-3 mt-2`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Bahar Yarıyılı</h4>
            <input
              type="text"
              name="springStart"
              value={editableEvent?.springStart || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg py-2 px-3`}
            />
            <input
              type="text"
              name="springEnd"
              value={editableEvent?.springEnd || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg py-2 px-3 mt-2`}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {isAdmin && (
            <>
              <button
                onClick={isEditing ? handleUpdate : handleEditToggle}
                className={`w-full ${
                  isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white py-2 px-4 rounded-lg transition-colors`}
              >
                {isEditing ? 'Kaydet' : 'Düzenle'}
              </button>
              {isEditing && (
                <button
                  onClick={handleEditToggle}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
              )}
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sil
              </button>
            </>
          )}
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
