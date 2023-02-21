import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let totalTexts = "";
async function summarizationText(req, res) {
  let newGeneratedText;

  try {
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `${req.body.currentGeneratedText}\nTl;dr`,
        temperature: 0.8,
        max_tokens: 2000,
      })
      .then(async (summarizedText) => {
        console.log("SUMARIZED COST", summarizedText);

        totalTexts = totalTexts + summarizedText.data.choices[0].text;
        newGeneratedText = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${totalTexts}\ncontinue this, the output should be a long text with vivid descriptions of the sorroundings, high pace with surprising twists in the plot.\n`,
          max_tokens: 2000,
          temperature: 1,
        });
        console.log("COST AFTER SUMMARIZATION", newGeneratedText);

        res.status(200).json(newGeneratedText.data.choices[0].text);
      });
  } catch (error) {
    console.log(error);
  }
}

export default summarizationText;
