require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('../server/src/routes/api');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// This is for Vercel serverless functions
module.exports = app;

// This is for local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}