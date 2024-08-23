const express = require('express');
const cors = require('cors');
const apiRoutes = require('./server/src/routes/api');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Add a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

module.exports = app;