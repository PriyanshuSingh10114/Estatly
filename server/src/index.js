import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/property.routes.js';
import predictionRoutes from './routes/prediction.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/predictions', predictionRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Estatly Backend is running' });
});

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/estatly')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
