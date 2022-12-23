import { generate } from "stability-client";

const api = generate({
  prompt: "a worker",
  width: 512,
  height: 512,
  samples: 1,
  cfgScale: 1,
  steps: 5,
  apiKey: process.env.API_KEY,
  noStore: false,
  outDir: "undefined",
});

console.log(api);

api.on("image", ({ buffer, filePath, steps }) => {
  console.log("Image", buffer, filePath, `steps: ${steps}`);
});

api.on("end", (data) => {
  console.log("Generating Complete", data);
});
