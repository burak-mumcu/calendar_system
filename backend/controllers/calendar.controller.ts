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
    const {calendar} = req.body
    const calendars = CalendarModel.findOne({name : calendar.name})
    if(!calendars) res.status(500).json({message : 'takvim bulunamadı'})
    calendars.updateOne(calendar)       
    res.status(200).json({message : 'takvim güncellendi'})
} 
catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası.' });
    }    
}
