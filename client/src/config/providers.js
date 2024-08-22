export const providerConfigs = {
  openai: {
    name: 'OpenAI',
    models: ['gpt-3.5-turbo', 'gpt-4'],
    apiKeyInstructions: 'Enter your OpenAI API key. You can find it in your OpenAI dashboard.',
  },
  anthropic: {
    name: 'Anthropic',
    models: ['claude-2', 'claude-instant-1'],
    apiKeyInstructions: 'Enter your Anthropic API key. You can request access from Anthropic\'s website.',
  },
  huggingface: {
    name: 'Hugging Face',
    models: ['gpt2', 'bert-base-uncased'],
    apiKeyInstructions: 'Enter your Hugging Face API key. You can find it in your Hugging Face account settings.',
  },
  llama: {
    name: 'Llama',
    models: ['llama-7b', 'llama-13b'],
    apiKeyInstructions: 'Enter your Llama API key. Contact Llama for access and API key information.',
  },
};
