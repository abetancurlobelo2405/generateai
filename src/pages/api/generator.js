import { getSession } from "next-auth/react";
import { Configuration, OpenAIApi } from "openai";
import cloudinary from "cloudinary/lib/cloudinary";
import User from "../../models/User";
import Post from "../../models/Post";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
});

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generator(req, res) {
  const plan = req.body.value;
  let isImage = false;
  let completion;
  let newImages;
  const imageToDB = [];
  let image = {};
  console.log(plan);
  try {
    switch (plan) {
      case 0:
        completion = await openai.createCompletion({
          model: "text-curie-001",
          prompt: `${req.body.input}.`,
          max_tokens: 2000,
          temperature: 1,
        });
        isImage = false;

        break;

      case 0.99:
        completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${req.body.input}.`,
          max_tokens: 3500,
          temperature: 1,
        });

        image = await openai.createImage({
          prompt: req.body.input,
          n: 4,
          size: "1024x1024",
        });

        isImage = true;
        break;

      default:
        break;
    }

    res.status(200).json({
      result: completion.data.choices[0].text,
      generatedImages: image?.data?.data,
    });

    const session = await getSession({ req });

    if (session) {
      const user = await User.findOne({ email: session?.user?.email });
      console.log(user);
      if (isImage) {
        const imageUploadPromises = image.data.data.map((img) => {
          return cloudinary.v2.uploader
            .upload(img.url)
            .then((result) => result.secure_url);
        });

        Promise.all(imageUploadPromises)
          .then(async (imageUrls) => {
            const newPost = await Post.create({
              rawText: req.body.input,
              generatedText: completion.data.choices[0].text,
              generatedImages: imageUrls,
              isPrivate: false,
              user: {
                id: String(user._id),
                user: user.username,
                email: user.email,
              },
            });
            user.posts = user.posts.concat(newPost._id);
            await user.save();
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (!isImage) {
        const newPost = await Post.create({
          rawText: req.body.input,
          generatedText: completion.data.choices[0].text,
          generatedImages: [],
          isPrivate: false,
          user: { id: user._id, user: user.username, email: user.email },
        });
        user.posts = user.posts.concat(newPost._id);
        await user.save();
      }
    }

    if (session === null) {
      if (isImage) {
        const imageUploadPromises = image.data.data.map((img) => {
          return cloudinary.v2.uploader
            .upload(img.url)
            .then((result) => result.secure_url);
        });

        Promise.all(imageUploadPromises)
          .then(async (imageUrls) => {
            await Post.create({
              rawText: req.body.input,
              generatedText: completion.data.choices[0].text,
              generatedImages: imageUrls,
              user: { user: "Anonymous" },
              isPrivate: false,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (!isImage) {
        await Post.create({
          rawText: req.body.input,
          generatedText: completion.data.choices[0].text,
          generatedImages: [],
          user: { user: "Anonymous" },
          isPrivate: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
