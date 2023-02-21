import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function textGenerator(req, res) {
  console.log(JSON.stringify(req.body.input));
  const { characterArray, main } = req.body.input;
  let characterCharacteristics = "";
  characterArray.map(
    (character) =>
      (characterCharacteristics += `${character.name}: ${character.description}, `)
  );

  let completion;
  try {
    completion = await openai.createCompletion({
      model: "text-ada-001",
      prompt: `
      \nwrite a long and interesting history with the following information:
      \n${
        ("chracter:",
        characterCharacteristics ? characterCharacteristics : undefined)
      }.
      \nmain plot: ${main}.
      \nwith the given information, 
      the output should be a long text with vivid descriptions of the sorroundings, 
      high pace with surprising twists in the plot. The story must end in suspense, 
      it should not have a definite end.\n`,
      max_tokens: 2000,
      temperature: 1,
    });
    console.log("COST OF INITIAL TEXT", completion);
    res.status(200).json(completion.data.choices[0].text);
  } catch (error) {
    console.log(error);
  }
}
