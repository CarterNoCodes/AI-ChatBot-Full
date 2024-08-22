const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/generate_code', async (req, res) => {
  const { prompt, language, conversation_history, model } = req.body;
  const apiKey = req.headers.authorization?.split(' ')[1];

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    const openai = new OpenAI({ apiKey });
    // Use the openai instance to generate code
    // ...

    res.json(result);
  } catch (error) {
    console.error('Error in /generate_code:', error);
    res.status(500).json({ error: error.message });
  }
});

// ... other routes

module.exports = app;