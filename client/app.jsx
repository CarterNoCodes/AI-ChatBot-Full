import React from 'react';
import ChatbotApp from './src/Components/ChatBotApp/ChatBotApp';
import ErrorBoundary from './src/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <ChatbotApp />
      </div>
    </ErrorBoundary>
  );
}

export default App;