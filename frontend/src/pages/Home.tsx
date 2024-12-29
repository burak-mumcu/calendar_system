import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import Navbar from '../components/Navbar';
import { AcademicEvent } from '../lib/types';
import React, { useEffect, useState } from 'react';
import CalendarExporter from '../components/CalenderExporter';
import { getEntityURL } from '../lib/api';
import axios from 'axios';
import { ICalendars } from '../lib/types';


interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendars, setCalendars] = useState<[ICalendars] | null>(null);

  const handleEventClick = (event: AcademicEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getCalendar();
  }, []);

  const getCalendar = async () => {
    try {
      const entityUrl = getEntityURL(["calendar"]);
      const response = await axios.get(entityUrl);
      setCalendars(response.data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  const logout = () => {
    onLogout();
    navigate('/login');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <Navbar onLogout={logout} />
      {calendars?.map((calendar, calendarIndex) => (
        <div key={calendarIndex} className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            {calendar.name}
          </h1>
          <h2 className="text-xl text-center mb-6">
            {calendar.subtitle}
          </h2>

          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th rowSpan={2} className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    AKADEMİK OLAY
                  </th>
                  <th colSpan={2} className="px-6 py-3 border-b border-gray-200 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    GÜZ YARIYILI
                  </th>
                  <th colSpan={2} className="px-6 py-3 border-b border-gray-200 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    BAHAR YARIYILI
                  </th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    BAŞLANGIÇ
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    BİTİŞ
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    BAŞLANGIÇ
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    BİTİŞ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calendar.calendar.map((event, eventIndex) => (
                  <tr key={eventIndex} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleEventClick(event)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.fallStart}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.fallEnd}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.springStart}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.springEnd}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal 
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
             <CalendarExporter events={calendar.calendar} />
        </div>
      ))}
    </>
  );
};

export default Home;
