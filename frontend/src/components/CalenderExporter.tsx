import React from 'react';
import { AcademicEvent } from '../lib/types';

const createICSFile = (events: AcademicEvent[]) => {
  // ICS dosyası başlangıcı
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AcademicCalendar//EN',
    'CALSCALE:GREGORIAN'
  ].join('\n');

  // Her event için güz ve bahar dönemi girişlerini oluştur
  events.forEach(event => {
    // Güz dönemi eventi
    icsContent += `
BEGIN:VEVENT
UID:${Math.random().toString(36).substring(2)}@academiccalendar
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${convertToICSDate(event.fallStart)}
DTEND:${convertToICSDate(event.fallEnd)}
SUMMARY:${event.event} (Güz Dönemi)
END:VEVENT`;

    // Bahar dönemi eventi
    icsContent += `
BEGIN:VEVENT
UID:${Math.random().toString(36).substring(2)}@academiccalendar
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${convertToICSDate(event.springStart)}
DTEND:${convertToICSDate(event.springEnd)}
SUMMARY:${event.event} (Bahar Dönemi)
END:VEVENT`;
  });

  // ICS dosyası sonu
  icsContent += '\nEND:VCALENDAR';
  return icsContent;
};

// Türkçe tarih formatını ICS formatına çevirme
const convertToICSDate = (turkishDate: string) => {
  if(!turkishDate) return '';
  const months: { [key: string]: string } = {
    'Ocak': '01', 'Subat': '02', 'Mart': '03', 'Nisan': '04',
    'Mayis': '05', 'Haziran': '06', 'Temmuz': '07', 'Agustos': '08',
    'Eylul': '09', 'Ekim': '10', 'Kasim': '11', 'Aralik': '12'
  };

  const [day, month, year] = turkishDate.split(' ');
  return `${year}${months[month]}${day.padStart(2, '0')}`;
};

const CalendarExporter: React.FC<{ events: AcademicEvent[] }> = ({ events }) => {
  const downloadCalendar = () => {
    const icsContent = createICSFile(events);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'academic_calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={downloadCalendar}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Takvimi İndir (ICS)
    </button>
  );
};

export default CalendarExporter;