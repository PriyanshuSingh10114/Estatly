import express from 'express';
import { predictPrice, getPredictionHistory, getLocations } from '../controllers/prediction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/locations', getLocations);
router.post('/', predictPrice);
router.get('/history', protect, getPredictionHistory);

export default router;
