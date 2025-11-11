// Simple Express backend for delivery route optimization
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const optimizer = require('./route_optimizer');
const sample = require('./sample_orders.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/sample', (req, res) => {
  res.json(sample);
});

app.post('/api/optimize', (req, res) => {
  try {
    const { start, orders } = req.body;
    if (!start || !orders) {
      return res.status(400).json({ error: 'Missing start or orders in request body' });
    }
    const result = optimizer.computeRoute(start, orders);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Route optimizer backend running on http://localhost:${PORT}`);
});
