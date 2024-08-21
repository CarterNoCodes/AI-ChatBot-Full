const express = require('express');
const router = express.Router();
const chatbot = require('../models/chatbot');

router.get('/model_status', (req, res) => {
  res.json({ loaded: chatbot.isModelLoaded() });
});

router.post('/generate_code', async (req, res) => {
  const { prompt, language, conversation_history, model } = req.body;
  const apiKey = req.headers.authorization.split(' ')[1];
  try {
    const result = await chatbot.generateCode(prompt, language, conversation_history, apiKey, model);
    res.json(result);
  } catch (error) {
    console.error('Error in /generate_code:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

module.exports = router;