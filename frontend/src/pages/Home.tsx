import { Modal } from '../components/Modal';
import Navbar from '../components/Navbar';
import { AcademicEvent } from '../lib/types'
import React, {useState} from 'react';


const academicCalendar: AcademicEvent[] = [
  {
    event: "Yatay Geçiş Başvuruları",
    fallStart: "5 Ağustos 2024",
    fallEnd: "29 Ağustos 2024",
    springStart: "13 Ocak 2025",
    springEnd: "21 Ocak 2025"
  },
];

interface HomeProps {
    isAuthenticated : boolean,
    onLogout:() => void,
}

const Home: React.FC<HomeProps> = ({isAuthenticated,onLogout}) => {
    const [isAuthenticate,changeAuthenticate] = useState(isAuthenticated);
    const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleEventClick = (event: AcademicEvent) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedEvent(null);
    };
  return (
    <>
    <Navbar isAuthenticated={isAuthenticate} onLogout={onLogout}/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-2">
        KIRKLARELİ ÜNİVERSİTESİ
      </h1>
      <h2 className="text-xl text-center mb-6">
        2024-2025 ÖN LİSANS VE LİSANS AKADEMİK TAKVİMİ
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
            {academicCalendar.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => {handleEventClick(event)}}>
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
    </div>
    </>
  );
}

export default Home;