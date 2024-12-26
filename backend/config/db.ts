import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!,{
      serverSelectionTimeoutMS: 30000, // Zaman aşımı süresini artırın
      connectTimeoutMS: 30000
    });
    console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Hata: ${error}`);
    process.exit(1);
  }
};

export default connectDB;