const express = require('express');
const cors = require('cors');
const apiRoutes = require('../src/routes/api');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// This is for Vercel serverless functions
module.exports = app;