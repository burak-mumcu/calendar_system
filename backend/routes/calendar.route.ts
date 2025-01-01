import express from "express";
import { createCalendar, deleteCalendar, deleteCalendarEvent, getCalendars, updateCalendar } from "../controllers/calendar.controller";

const router = express.Router();

router.get('/',getCalendars)
router.post('/create',createCalendar)
router.post('/update',updateCalendar)
router.post('/delete',deleteCalendar);
router.post('/delete/event',deleteCalendarEvent);

export default router