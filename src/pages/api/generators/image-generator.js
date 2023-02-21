import cloudinary from "cloudinary/lib/cloudinary";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
});

export default async function imageGenerator(req, res) {
  try {
    const textSummarization = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body.text}\n\nTl;dr`,
      temperature: 1,
      max_tokens: 2500,
    });

    const response = await openai.createImage({
      prompt: textSummarization.data.choices[0].text,
      n: 2,
      size: "256x256",
    });
    const image_url = response.data.data;
    res.status(200).json(image_url);
  } catch (error) {
    console.log(error);
  }
}
