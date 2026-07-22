const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Mock Data for the Dashboard
const fraudNetworkData = {
  nodes: [
    { id: 1, label: 'Target: Bank Acct', type: 'target' },
    { id: 2, label: 'Mule 1', type: 'mule' },
    { id: 3, label: 'Mule 2', type: 'mule' },
    { id: 4, label: 'Scammer Phone A', type: 'source' },
    { id: 5, label: 'Scammer Phone B', type: 'source' },
    { id: 6, label: 'Spoofed IP', type: 'source' }
  ],
  edges: [
    { from: 2, to: 1 }, { from: 3, to: 1 },
    { from: 4, to: 2 }, { from: 5, to: 3 },
    { from: 6, to: 4 }, { from: 6, to: 5 }
  ]
};

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'nominal', service: 'Rakshak API' });
});

app.get('/api/intel/network-graph', (req, res) => {
  res.json(fraudNetworkData);
});

app.post('/api/intel/analyze-call', (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });
  
  // Connect to ML layer logic goes here
  res.json({
    riskLevel: 'high',
    confidence: 0.92,
    message: 'Pattern matching indicates a likely Digital Arrest scam.'
  });
});

app.listen(PORT, () => {
  console.log(`Rakshak Backend API running on port ${PORT}`);
});
