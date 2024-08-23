const express = require('express');
const cors = require('cors');
const apiRoutes = require('./server/src/routes/api');

const app = express();

app.use(cors());
app.use(express.json());

// Add a root route
app.get('/', (req, res) => {
  res.json({ message: 'API root is working' });
});

// Add a test route
app.get('/test', (req, res) => {
  res.json({ message: 'API test route is working' });
});

app.use('/api', apiRoutes);

module.exports = app;