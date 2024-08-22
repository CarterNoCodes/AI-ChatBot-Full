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
  const [showSearchModal, setShowSearchModal] = useState(false);

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