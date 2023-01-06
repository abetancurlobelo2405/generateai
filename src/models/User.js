import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  isAnonymous: {
    type: Boolean,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
