const modelLoader = require('../utils/modelLoader');

let model = null;
let modelLoadingPromise = null;

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
      // Add cases for other providers
      default:
        throw new Error('Unsupported provider');
    }

    // Process and return the response
    // You'll need to adapt this based on the response format of each provider
    return {
      code: response.choices[0].message.content,
      analysis: 'Analysis would go here'
    };
  }
};

module.exports = chatbot;