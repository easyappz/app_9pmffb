const express = require('express');
const { mongoose } = require('./db');

// Schema for logging calculations
const CalculationLogSchema = new mongoose.Schema({
  operation: { type: String, required: true },
  operands: { type: [Number], required: true },
  result: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const CalculationLog = mongoose.model('CalculationLog', CalculationLogSchema);

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate
router.post('/calculate', async (req, res) => {
  try {
    const { operation, operands } = req.body;

    if (!operation || !operands || !Array.isArray(operands)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    let result;
    if (operation === 'add') {
      result = operands.reduce((acc, curr) => acc + curr, 0);
    } else if (operation === 'subtract') {
      result = operands.reduce((acc, curr) => acc - curr);
    } else if (operation === 'multiply') {
      result = operands.reduce((acc, curr) => acc * curr, 1);
    } else if (operation === 'divide') {
      if (operands.some(num => num === 0)) {
        return res.status(400).json({ error: 'Division by zero is not allowed' });
      }
      result = operands.reduce((acc, curr) => acc / curr);
    } else {
      return res.status(400).json({ error: 'Unsupported operation' });
    }

    // Log the calculation to MongoDB
    const logEntry = new CalculationLog({
      operation,
      operands,
      result,
    });
    await logEntry.save();

    res.json({ result });
  } catch (error) {
    console.error('Error processing calculation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/calculation-logs
router.get('/calculation-logs', async (req, res) => {
  try {
    const logs = await CalculationLog.find().sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (error) {
    console.error('Error fetching calculation logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
