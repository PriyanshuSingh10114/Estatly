import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    featuredImage: { type: String, required: true },
    readingTime: { type: Number, default: 5 },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', BlogSchema);
