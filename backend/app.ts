import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth.route';
import calendarRoutes from './routes/calendar.route'

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/calendar',calendarRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});