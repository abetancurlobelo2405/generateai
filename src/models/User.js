import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  posts: [{ type: Object }],
  plan: {
    isSubscribed: { type: Boolean },
    subscriptionDetails: { type: Object },
  },
  isAnonymous: {
    type: Boolean,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
