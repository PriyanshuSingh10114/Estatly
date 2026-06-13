import axios from 'axios';
import Prediction from '../models/Prediction.js';
import User from '../models/User.js';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

export const predictPrice = async (req, res) => {
  try {
    const { location, sqft, bath, bhk } = req.body;
    
    // Call ML Service
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, {
      location,
      sqft,
      bath,
      bhk
    });

    const predictedPrice = mlResponse.data.predicted_price;

    // Save history if user is authenticated
    if (req.user) {
      const userId = req.user.id;
      const prediction = await Prediction.create({
        user: userId,
        location,
        sqft,
        bath,
        bhk,
        predictedPrice
      });
      
      // Update User history
      await User.findByIdAndUpdate(userId, {
        $push: { predictionHistory: prediction._id }
      });
    }

    res.json({
      location,
      sqft,
      bath,
      bhk,
      predicted_price: predictedPrice,
      price_range: [predictedPrice * 0.95, predictedPrice * 1.05],
      market_confidence: 'High',
      investment_score: 8.5
    });
  } catch (error) {
    console.error('Error in predicting price:', error);
    res.status(500).json({ message: 'Error predicting price', error });
  }
};

export const getPredictionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await Prediction.find({ user: userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error });
  }
};

export const getLocations = async (req, res) => {
  try {
    const mlResponse = await axios.get(`${ML_SERVICE_URL}/locations`);
    res.json(mlResponse.data);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations' });
  }
};
