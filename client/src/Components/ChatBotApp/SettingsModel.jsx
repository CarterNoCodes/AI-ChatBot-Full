import React from 'react';
import './model.css';
import { providerConfigs } from '../../config/providers';

const SettingsModal = ({ apiKey, setApiKey, selectedModel, setSelectedModel, selectedProvider, setSelectedProvider, onClose }) => {
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Settings</h2>
        <div className="setting">
          <label htmlFor="provider">Provider:</label>
          <select id="provider" value={selectedProvider} onChange={handleProviderChange}>
            {Object.entries(providerConfigs).map(([key, config]) => (
              <option key={key} value={key}>{config.name}</option>
            ))}
          </select>
        </div>
        <div className="setting">
          <label htmlFor="api-key">API Key:</label>
          <input
            type="password"
            id="api-key"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your API key"
          />
          <p className="api-key-instructions">{providerConfigs[selectedProvider].apiKeyInstructions}</p>
        </div>
        <div className="setting">
          <label htmlFor="model">Model:</label>
          <select id="model" value={selectedModel} onChange={handleModelChange}>
            {providerConfigs[selectedProvider].models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SettingsModal;