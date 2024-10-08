# AI-ChatBot-Full

AI-ChatBot-Full is a full-stack application that provides an interactive chatbot interface for generating and analyzing code. It supports multiple AI providers, including OpenAI, Anthropic, Hugging Face, and Llama, allowing users to choose their preferred model for code generation and analysis.

## Features

- Real-time chat interface
- Code generation in multiple programming languages
- Code analysis
- Support for multiple AI providers (OpenAI, Anthropic, Hugging Face, Llama)
- Customizable settings (API key, provider, and model selection)
- File attachment support
- Search functionality for chat history
- Responsive design

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express.js
- Multiple AI provider APIs (OpenAI, Anthropic, Hugging Face, Replicate)

## Project Structure

The project is divided into two main parts: client and server.

### Client

The client-side code is located in the `client` directory. It's a React application built with Vite.

Key files and directories:

- `src/Components/ChatBotApp/`: Contains the main ChatBot component and related files
- `src/config/providers.js`: Configuration for AI providers
- `app.jsx`: Main application component
- `main.jsx`: Entry point of the React application
- `vite.config.js`: Vite configuration file

### Server

The server-side code is located in the `server` directory. It's a Node.js application using Express.js.

Key files and directories:

- `src/`: Contains the main server code
  - `app.js`: Express application setup
  - `models/`: Contains the chatbot model
  - `routes/`: API routes
  - `utils/`: Utility functions
- `api/index.js`: Entry point of the server application

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/CarterNoCodes/AI-ChatBot-Full.git
   cd AI-ChatBot-Full
   ```

2. Install dependencies for both client and server:

   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Install AI provider SDKs:

   ```
   cd server
   npm install openai @anthropic-ai/sdk @huggingface/inference replicate
   ```

4. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add your API keys for the providers you want to use:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ANTHROPIC_API_KEY=your_anthropic_api_key_here
     HUGGINGFACE_API_KEY=your_huggingface_api_key_here
     REPLICATE_API_KEY=your_replicate_api_key_here
     ```

## Running the Application

1. Start the server:

   ```
   cd server && npm start
   ```

2. Start the client:

   ```
   cd client && npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite)

## API Endpoints

- `GET /api/model_status`: Check if the AI model is loaded
- `POST /api/generate_code`: Generate code based on user input

## Contributing

We welcome contributions to this project. Here's how you can contribute:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and commit them with a descriptive commit message.
5. Push your changes to your fork on GitHub.
6. Create a pull request from your fork to the main repository.

Please ensure that your code adheres to the existing style and that you've tested your changes before submitting a pull request.

## Issues

If you encounter any bugs or have feature requests, please [open an issue](https://github.com/CarterNoCodes/AI-ChatBot-Full/issues) on the GitHub repository. Provide as much detail as possible to help us understand and address the problem.

## License

This project is open source and available under the [MIT License](LICENSE).
