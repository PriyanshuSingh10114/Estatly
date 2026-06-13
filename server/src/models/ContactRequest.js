import mongoose, { Schema } from 'mongoose';

const ContactRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export default mongoose.model('ContactRequest', ContactRequestSchema);
