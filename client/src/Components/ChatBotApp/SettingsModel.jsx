import React from 'react';
import './model.css';

const SettingsModal = ({ apiKey, setApiKey, selectedModel, setSelectedModel, onClose }) => {
  console.log('Rendering SettingsModal');
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Settings</h2>
        <div className="setting">
          <label htmlFor="api-key">API Key:</label>
          <input
            type="password"
            id="api-key"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your OpenAI API key"
          />
        </div>
        <div className="setting">
          <label htmlFor="model">Model:</label>
          <select id="model" value={selectedModel} onChange={handleModelChange}>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SettingsModal;