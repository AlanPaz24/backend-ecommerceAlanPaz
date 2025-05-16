import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log("MONGO_URL:", process.env.MONGO_URL); // 👈 agregalo

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
  }
};
