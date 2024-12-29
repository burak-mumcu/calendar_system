import express from "express";
import { createCalendar, getCalendars, updateCalendar } from "../controllers/calendar.controller";

const router = express.Router();

router.get('/',getCalendars)
router.post('/create',createCalendar)
router.post('/update',updateCalendar)

export default router