import mongoose, { Schema } from 'mongoose';

const PredictionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    sqft: { type: Number, required: true },
    bath: { type: Number, required: true },
    bhk: { type: Number, required: true },
    predictedPrice: { type: Number, required: true },
    confidenceScore: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Prediction', PredictionSchema);
