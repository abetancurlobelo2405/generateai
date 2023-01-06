import mongoose, { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
  rawText: String,
  generatedText: String,
  generatedImages: { type: [String] },
  isPrivate: Boolean,
  user: { type: Object },
  date: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
