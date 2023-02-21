import mongoose, { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
  cover: { type: String },
  chapters: { type: Array },
  userInput: { type: Object },
  user: { type: Object },
  generatedImages: { type: [String] },
  isPrivate: Boolean,
  date: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
