import React, { useState, useEffect, useRef } from 'react';
import './ChatBotApp.css';
import SearchModal from './SearchModel';
import SettingsModal from './SettingsModel';

const ChatbotApp = () => {
  console.log('Rendering ChatbotApp');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const addMessage = (sender, content, type = 'text') => {
    setChatMessages(prevMessages => [...prevMessages, { sender, content, type }]);
  };

  const sendMessage = async () => {
    if (userInput.trim()) {
      addMessage('user', userInput);
      setUserInput('');
      
      if (!apiKey) {
        addMessage('bot', 'Please enter your API key in the settings.');
        return;
      }

      try {
        const response = await fetch('/api/generate_code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: userInput,
            language: 'javascript',
            conversation_history: chatMessages,
            model: selectedModel,
            provider: selectedProvider,
            apiKey: apiKey,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();
        addMessage('bot', data.code, 'code');
        if (data.analysis) {
          addMessage('bot', data.analysis);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        addMessage('bot', `Error: ${error.message}`);
      }
    }
  };

  console.log('Before return in ChatbotApp');
  return (
    <div className="chatbot-app">
      <div className="chat-container">
        <div className="chatbot-header">
          <div className="chatbot-info">
            <div className="avatar">AI</div>
            <div>
              <div className="chatbot-name">AI Assistant</div>
              <div className="chatbot-status">Online</div>
            </div>
          </div>
          <div className="header-buttons">
            <button className="icon-button" onClick={() => setShowSearchModal(true)}>🔍</button>
            <button className="icon-button" onClick={() => setShowSettingsModal(true)}>⚙️</button>
          </div>
        </div>
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                <div className="message-sender">{message.sender}</div>
                {message.type === 'code' ? (
                  <pre><code>{message.content}</code></pre>
                ) : (
                  <div className="message-text">{message.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <button className="attachment-button">📎</button>
          <input
            type="text"
            className="chat-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
      {showSettingsModal && (
        <SettingsModal
          apiKey={apiKey}
          setApiKey={setApiKey}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
      {showSearchModal && (
        <SearchModal
          chatMessages={chatMessages}
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </div>
  );
};

export default ChatbotApp;