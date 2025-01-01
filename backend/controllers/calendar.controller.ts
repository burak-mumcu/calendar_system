import { Request,Response } from "express";

import CalendarModel from "../models/Calendar";

export const getCalendars = async (req:Request,res: Response) => {
    try {
      // Tüm takvimleri veritabanından alıyoruz
      const calendars = await CalendarModel.find();
  
      if (calendars.length === 0) {
        return res.status(404).json({ message: 'Takvim bulunamadı.' });
      }
  
      // Takvimler bulunduysa, başarıyla yanıtlıyoruz
      return res.status(200).json(calendars);
    } catch (error) {
      console.error('Takvimler alınırken hata oluştu:', error);
      return res.status(500).json({ message: 'Sunucu hatası.' });
    }
}

export const createCalendar = async (req:Request,res:Response) => {
    try {
        const { calendar } = req.body;
        const calendars = CalendarModel.findOne({name : calendar.name})
        if(!!calendars) return res.status(500).json({message : 'bu isimde bir takvim bulunmakta'})
           let created = await CalendarModel.create(calendar)
           res.status(200).json({created});  
    } catch (error) {
      return res.status(500).json({ message: 'Sunucu hatası.' });
    }
}

export const updateCalendar = async (req:Request,res:Response) => {
try {
    const { event,name } = req.body
    const calendar = await CalendarModel.findOne({ name: name });
  if (!calendar) {
    return res.status(404).json({ message: 'Takvim bulunamadı' });
  }

  // Etkinlik güncelleme
  const updatedEvents = calendar.calendar.map((item) => {
    if (item.event === event.event) {
      return{ ...item, ...event };
    }
    return item; 
  });

  calendar.calendar = updatedEvents;


  await calendar.save();

  res.status(200).json({ message: 'Takvim güncellendi' });
} 
catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası.' + error });
    }    
}

export const deleteCalendarEvent = async(req:Request,res:Response) => {
try {
  const {eventName , name } = req.body;
  const calendar = await CalendarModel.findOne({ name: name });
  if (!calendar) {
    return res.status(404).json({ message: 'Takvim bulunamadı' });
  }

  calendar.calendar = calendar.calendar.filter((item) => {
    if(item.event !== eventName) return item;
  });

  await calendar.save();
  res.status(200).json({ message: 'Olay başarıyla silindi' });

} catch (error) {
  res.status(500).json({message : 'sunucu hatası' + error})
}
}

export const deleteCalendar = async (req:Request,res:Response) => {
  try {
    const {calendar} = req.body;
    CalendarModel.findOneAndDelete({name : calendar.name})
    res.status(500).json({message : 'Takvim başarıyla silindi'})
  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
}
