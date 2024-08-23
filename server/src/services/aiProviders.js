const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { HfInference } = require('@huggingface/inference');
const Replicate = require('replicate');

const generateWithOpenAI = async (apiKey, prompt, model) => {
  const openai = new OpenAI({ apiKey });
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
};

const generateWithAnthropic = async (apiKey, prompt, model) => {
  const anthropic = new Anthropic({ apiKey });
  const response = await anthropic.completions.create({
    model: model,
    prompt: prompt,
    max_tokens_to_sample: 300,
  });
  return response.completion;
};

const generateWithHuggingFace = async (apiKey, prompt, model) => {
  const hf = new HfInference(apiKey);
  const response = await hf.textGeneration({
    model: model,
    inputs: prompt,
  });
  return response.generated_text;
};

const generateWithLlama = async (apiKey, prompt, model) => {
  const replicate = new Replicate({ auth: apiKey });
  const response = await replicate.run(model, { input: { prompt: prompt } });
  return response.join('');
};

module.exports = {
  generateWithOpenAI,
  generateWithAnthropic,
  generateWithHuggingFace,
  generateWithLlama,
};