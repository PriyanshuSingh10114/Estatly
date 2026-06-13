import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google Login
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profilePicture: { type: String },
    savedProperties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
    predictionHistory: [{ type: Schema.Types.ObjectId, ref: 'Prediction' }],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
