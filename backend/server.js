const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const calculationRoutes = require('./routes/calculations');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'FutureNest API'
  });
});

// API Routes
app.use('/api/calculations', calculationRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`FutureNest API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
