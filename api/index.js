const express = require('express');
const cors = require('cors');
const apiRoutes = require('../server/src/routes/api');

const app = express();

app.use(cors());
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// This is for Vercel serverless functions
module.exports = app;