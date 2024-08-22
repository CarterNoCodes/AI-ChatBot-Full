const modelLoader = require('../utils/modelLoader');

let model = null;
let modelLoadingPromise = null;

const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const HuggingFace = require('@huggingface/inference');
const Replicate = require('replicate');

const chatbot = {
  isModelLoaded: () => model !== null,

  generateCode: async (prompt, language, conversationHistory, apiKey, selectedModel, selectedProvider) => {
    if (!model) {
      if (!modelLoadingPromise) {
        modelLoadingPromise = modelLoader.loadModel(apiKey);
      }
      model = await modelLoadingPromise;
    }

    let response;

    switch (selectedProvider) {
      case 'openai':
        const openai = new OpenAI({ apiKey });
        response = await openai.chat.completions.create({
          model: selectedModel,
          messages: [
            ...conversationHistory,
            { role: "user", content: `Generate ${language} code for the following task: ${prompt}` }
          ],
        });
        break;
      case 'anthropic':
        const anthropic = new Anthropic({ apiKey });
        response = await anthropic.completions.create({
          model: selectedModel,
          prompt: `Human: Generate ${language} code for the following task: ${prompt}\n\nAssistant:`,
          max_tokens_to_sample: 1000,
        });
        break;
      case 'huggingface':
        const hf = new HuggingFace(apiKey);
        response = await hf.textGeneration({
          model: selectedModel,
          inputs: `Generate ${language} code for the following task: ${prompt}`,
        });
        break;
      case 'llama':
        const replicate = new Replicate({ auth: apiKey });
        response = await replicate.run(
          "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
          {
            input: {
              prompt: `Generate ${language} code for the following task: ${prompt}`,
            }
          }
        );
        break;
      default:
        throw new Error('Unsupported provider');
    }

    // Process and return the response
    // You'll need to adapt this based on the response format of each provider
    return {
      code: response.choices ? response.choices[0].message.content : response.output,
      analysis: 'Analysis would go here'
    };
  }
};

module.exports = chatbot;