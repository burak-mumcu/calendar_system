import mongoose, { Schema, Document } from 'mongoose';

// AcademicEvent interface
export interface AcademicEvent {
  event: string;
  fallStart: string;
  fallEnd: string;
  springStart: string;
  springEnd: string;
}

// Takvim Koleksiyonu (Calendar) Şeması
interface CalendarDocument extends Document { 
  calendar: AcademicEvent[];
}

// Mongoose Şeması
const academicEventSchema = new Schema<AcademicEvent>({
  event: { type: String, required: true },
  fallStart: { type: String, required: true },
  fallEnd: { type: String, required: true },
  springStart: { type: String, required: true },
  springEnd: { type: String, required: true },
});

const calendarSchema = new Schema<CalendarDocument>({
  calendar: [academicEventSchema],  // Takvime ait etkinlikler
});

// Model oluşturma
const CalendarModel = mongoose.model<CalendarDocument>('Calendar', calendarSchema);

export default CalendarModel;
