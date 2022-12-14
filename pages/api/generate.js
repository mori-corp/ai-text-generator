import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    // index.jsのbodyで定義された、productNameを引っ張ってくる
    prompt: generatePrompt(req.body.productName),
    temperature: 0.6,
    max_tokens: 200,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(product) {
  return `Generate a clear product description explanation for the following product: ${product}.`;
}
