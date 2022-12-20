import mongoose, { model, models, Schema } from "mongoose";

const ProfileSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  histories: [
    {
      rawText: String,
      generatedText: String,
      author: String,
      isPrivate: Boolean,
    },
  ],
});

const Profile = models.Profile || model("Profile", ProfileSchema);
export default Profile;
