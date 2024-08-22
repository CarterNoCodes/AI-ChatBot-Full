import React, { useState, useEffect, useRef } from 'react';
import './ChatBotApp.css';
import SearchModal from './SearchModel';
import SettingsModal from './SettingsModel';

const ChatbotApp = () => {
  console.log('Rendering ChatbotApp');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');

  console.log('Before return in ChatbotApp');
  return (
    <div className="chatbot-app">
      {console.log('Inside ChatbotApp return')}
      <h1>Chatbot App</h1>
      <button onClick={() => setShowSettingsModal(true)}>Open Settings</button>
      {showSettingsModal && (
        <SettingsModal
          apiKey={apiKey}
          setApiKey={setApiKey}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
};

export default ChatbotApp;