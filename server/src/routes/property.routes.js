import express from 'express';
import { getProperties, getPropertyById, createProperty } from '../controllers/property.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(getProperties).post(protect, createProperty);
router.route('/:id').get(getPropertyById);

export default router;
