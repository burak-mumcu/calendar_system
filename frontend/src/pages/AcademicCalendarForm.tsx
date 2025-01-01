import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getEntityURL } from '../lib/api';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { formatDate } from '../lib/dateFormatter';

interface AcademicEvent {
  event: string;
  fallStart: string;
  fallEnd: string;
  springStart: string;
  springEnd: string;
}

interface ICalendars {
  name: string;
  subtitle: string;
  calendar: AcademicEvent[];
}

const AcademicCalendarForm = () => {
  const navigate = useNavigate()
  const [calendarData, setCalendarData] = useState<ICalendars>({
    name: '',
    subtitle: '',
    calendar: [{
      event: '',
      fallStart: '',
      fallEnd: '',
      springStart: '',
      springEnd: ''
    }]
  });

  useEffect(() => {

    let isAdmin = localStorage.getItem('role') === 'admin'
    if(!isAdmin) navigate('/');
  },[])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formattedCalendar = calendarData.calendar.map(event => ({
        ...event,
      fallStart: formatDate(event.fallStart),
      fallEnd: formatDate(event.fallEnd),
      springStart: formatDate(event.springStart),
      springEnd: formatDate(event.springEnd),
      }))
      const Calendar = {name : calendarData.name,subtitle : calendarData.subtitle,
        calendar: formattedCalendar,}
      let entityURL = getEntityURL(["calendar","create"])
      let response = await axios.post(entityURL, { calendar : Calendar} );
      
      if (response.status === 200) {
        alert('Takvim başarıyla oluşturuldu!');
        // Formu temizle
        setCalendarData({
          name: '',
          subtitle: '',
          calendar: [{
            event: '',
            fallStart: '',
            fallEnd: '',
            springStart: '',
            springEnd: ''
          }]
        });
        
      }
    } catch (error) {
      alert('Bir hata oluştu!');
      console.error('Error:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalendarData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventChange = (index: number, field: keyof AcademicEvent, value: string) => {
    setCalendarData(prev => {
      const newCalendar = [...prev.calendar];
      newCalendar[index] = {
        ...newCalendar[index],
        [field]: value
      };
      return {
        ...prev,
        calendar: newCalendar
      };
    });
  }

  const addEvent = () => {
    setCalendarData(prev => ({
      ...prev,
      calendar: [...prev.calendar, {
        event: '',
        fallStart: '',
        fallEnd: '',
        springStart: '',
        springEnd: ''
      }]
    }));
  };
  const onLogout = () => {
    navigate('/login')
  }

  const removeEvent = (index: number) => {
    setCalendarData(prev => ({
      ...prev,
      calendar: prev.calendar.filter((_, i) => i !== index)
    }));
  };

  return (<>
  <Navbar onLogout={onLogout} />
     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Akademik Takvim Oluştur</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Takvim Adı</label>
            <input
              type="text"
              name="name"
              value={calendarData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Alt Başlık</label>
            <input
              type="text"
              name="subtitle"
              value={calendarData.subtitle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Etkinlikler</h2>
            <button
              type="button"
              onClick={addEvent}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <PlusCircle className="w-5 h-5" />
              Etkinlik Ekle
            </button>
          </div>

          {calendarData.calendar.map((event, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Etkinlik {index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEvent(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Etkinlik Adı</label>
                  <input
                    type="text"
                    value={event.event}
                    onChange={(e) => handleEventChange(index, 'event', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Güz Dönemi Başlangıç</label>
                  <input
                    type="date"
                    value={event.fallStart}
                    onChange={(e) => handleEventChange(index, 'fallStart', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Güz Dönemi Bitiş</label>
                  <input
                    type="date"
                    value={event.fallEnd}
                    onChange={(e) => handleEventChange(index, 'fallEnd', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bahar Dönemi Başlangıç</label>
                  <input
                    type="date"
                    value={event.springStart}
                    onChange={(e) => handleEventChange(index, 'springStart', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bahar Dönemi Bitiş</label>
                  <input
                    type="date"
                    value={event.springEnd}
                    onChange={(e) => handleEventChange(index, 'springEnd', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Takvimi Kaydet
          </button>
        </div>
      </form>
    </div>
   </>
  
  );
};

export default AcademicCalendarForm;