const modelLoader = require('../utils/modelLoader');

let model = null;
let modelLoadingPromise = null;

const chatbot = {
  isModelLoaded: () => model !== null,

  generateCode: async (prompt, language, conversationHistory, apiKey, selectedModel) => {
    if (!model) {
      if (!modelLoadingPromise) {
        modelLoadingPromise = modelLoader.loadModel(apiKey);
      }
      model = await modelLoadingPromise;
    }

    const messages = [
      ...conversationHistory,
      { role: "user", content: `Generate ${language} code for the following task: ${prompt}` }
    ];

    try {
      const completion = await model.chat.completions.create({
        model: selectedModel,
        messages: messages,
      });

      const generatedCode = completion.choices[0].message.content;
      
      // Generate analysis
      const analysisPrompt = `Analyze the following ${language} code:\n\n${generatedCode}\n\nProvide a brief explanation of what the code does.`;
      const analysisCompletion = await model.chat.completions.create({
        model: selectedModel,
        messages: [{ role: "user", content: analysisPrompt }],
      });

      const analysis = analysisCompletion.choices[0].message.content;

      return {
        code: generatedCode,
        analysis: analysis
      };
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }
};

module.exports = chatbot;