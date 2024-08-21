const modelLoader = {
  OpenAI: require('openai'),
  loadModel: async (apiKey) => {
    console.log('Loading model...');
    try {
      const openai = new modelLoader.OpenAI({ apiKey });
      console.log('Model loaded');
      return openai;
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }
};
  
module.exports = modelLoader;