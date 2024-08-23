const express = require('express');
const router = express.Router();
const chatbot = require('../models/chatbot');

router.post('/generate_code', async (req, res) => {
  const { prompt, language, conversation_history, model, provider, apiKey } = req.body;

  try {
    const result = await chatbot.generateCode(prompt, language, conversation_history, apiKey, model, provider);
    res.json(result);
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;