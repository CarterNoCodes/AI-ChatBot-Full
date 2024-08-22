import React, { useState, useEffect, useRef } from 'react';
import './ChatBotApp.css';
import SearchModal from './SearchModel';
import SettingsModal from './SettingsModel';

const ChatbotApp = () => {
  console.log('Rendering ChatbotApp');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const addMessage = (sender, content, type = 'text') => {
    setChatMessages(prevMessages => [...prevMessages, { sender, content, type }]);
  };

  const sendMessage = () => {
    if (userInput.trim()) {
      addMessage('user', userInput);
      setUserInput('');
      
      if (!apiKey) {
        addMessage('bot', 'Please enter your OpenAI API key in the settings.');
        return;
      }

      // Here, you would typically make an API call to your backend
      // For now, let's just simulate a response
      setTimeout(() => {
        addMessage('bot', 'This is a simulated response.');
      }, 1000);
    }
  };

  console.log('Before return in ChatbotApp');
  return (
    <div className="chatbot-app">
      {console.log('Inside ChatbotApp return')}
      <h1>Chatbot App</h1>
      <div className="chat-messages">
        {chatMessages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <strong>{message.sender}: </strong>
            {message.type === 'code' ? (
              <pre><code>{message.content}</code></pre>
            ) : (
              <span>{message.content}</span>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
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