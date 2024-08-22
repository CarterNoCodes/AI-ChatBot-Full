import React, { useState, useEffect, useRef } from 'react';
import './ChatBotApp.css';
import SearchModal from './SearchModel';
import SettingsModal from './SettingsModel';

const ChatbotApp = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsModelLoading(false);
  }, []);

  const sendMessage = () => {
    if (userInput.trim() && apiKey) {
      const selectedLanguage = 'python';

      addMessage('user', userInput);
      setUserInput('');

      setConversationHistory([...conversationHistory, { role: 'user', content: userInput }]);

      const prompt = `Generate ${selectedLanguage} code for the following task: ${userInput}`;

      const apiUrl = import.meta.env.VITE_API_URL || '/api';

      fetch(`${apiUrl}/generate_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: userInput,
          language: selectedLanguage,
          conversation_history: conversationHistory,
          model: selectedModel,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.code) {
            addMessage('bot', data.code, 'code');
            if (data.analysis) {
              addMessage('bot', data.analysis);
            }
          } else if (data.error) {
            addMessage('bot', `Error: ${data.error}`);
          }
        })
        .catch((error) => {
          console.error('Fetch Error:', error);
          addMessage('bot', 'Sorry, something went wrong.');
        });
    } else if (!apiKey) {
      addMessage('bot', 'Please enter your OpenAI API key in the settings.');
    }
  };

  const addMessage = (sender, content, language = 'plaintext') => {
    setChatMessages([
      ...chatMessages,
      { sender, content, language },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAttachment = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        addMessage('user', `Attached file: ${file.name}\n\nContent:\n${fileContent}`);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="chatbot-app">
      <div className="chat-container">
        <header className="chatbot-header">
          <div className="chatbot-info">
            <div className="avatar">CG</div>
            <div>
              <div className="chatbot-name">CodeGPT</div>
              <div className="chatbot-status">Online</div>
            </div>
          </div>
          <div className="header-buttons">
            <button className="icon-button" onClick={() => setShowSearchModal(true)}>🔍</button>
            <button className="icon-button" onClick={() => setShowSettingsModal(true)}>⚙️</button>
          </div>
        </header>
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender}-message ${
                message.language === 'code' ? 'code-message' : ''
              }`}
            >
              <div className="avatar">{message.sender === 'user' ? 'YO' : 'CG'}</div>
              <div className="message-content">
                <div className="message-sender">{message.sender === 'user' ? 'You' : 'CodeGPT'}</div>
                <div className="message-text">{message.content}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <button className="attachment-button" onClick={handleAttachment}>📎</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <textarea
            className="chat-input"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-button" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
      {showSearchModal && (
        <SearchModal
          chatMessages={chatMessages}
          onClose={() => setShowSearchModal(false)}
        />
      )}
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