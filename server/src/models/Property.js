import mongoose, { Schema } from 'mongoose';

const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: Number, required: true }, // in sqft
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    images: [{ type: String }], // Array of Cloudinary URLs
    builder: { type: String },
    amenities: [{ type: String }],
    propertyAge: { type: Number },
    furnishing: {
      type: String,
      enum: ['unfurnished', 'semi-furnished', 'fully-furnished'],
      default: 'unfurnished',
    },
    views: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Property', PropertySchema);
