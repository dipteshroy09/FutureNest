const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { calculateAll, generateYearlyBreakdown } = require('../lib/calculations');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Validation rules
const calculationValidation = [
  body('goal_name')
    .trim()
    .notEmpty().withMessage('Goal name is required')
    .isLength({ max: 50 }).withMessage('Goal name too long'),
  body('current_cost')
    .isFloat({ min: 1 }).withMessage('Current cost must be positive'),
  body('years')
    .isInt({ min: 1, max: 50 }).withMessage('Years must be between 1 and 50'),
  body('inflation_rate')
    .isFloat({ min: 0, max: 100 }).withMessage('Inflation rate must be 0-100'),
  body('expected_return')
    .isFloat({ min: 0, max: 100 }).withMessage('Expected return must be 0-100')
];

// POST /api/calculations - Create new calculation
router.post('/', calculationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { goal_name, current_cost, years, inflation_rate, expected_return, session_id } = req.body;

    // Calculate results
    const inputs = {
      current_cost: parseFloat(current_cost),
      years: parseInt(years),
      inflation_rate: parseFloat(inflation_rate),
      expected_return: parseFloat(expected_return)
    };

    const results = calculateAll(inputs);

    // Generate session ID if not provided
    const newSessionId = session_id || uuidv4();

    // Insert into database
    const [result] = await pool.execute(
      `INSERT INTO calculations 
       (session_id, goal_name, current_cost, years, inflation_rate, expected_return,
        future_goal_value, required_sip, total_invested, expected_wealth)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newSessionId,
        goal_name,
        inputs.current_cost,
        inputs.years,
        inputs.inflation_rate,
        inputs.expected_return,
        results.future_goal_value,
        results.required_sip,
        results.total_invested,
        results.expected_wealth
      ]
    );

    // Generate yearly breakdown
    const yearlyBreakdown = generateYearlyBreakdown(results.required_sip, inputs.expected_return, inputs.years);

    // Store yearly breakdown (optional - can be generated on-demand)
    const breakdownPromises = yearlyBreakdown.map(row => 
      pool.execute(
        'INSERT INTO yearly_breakdown (calculation_id, year_number, invested_amount, portfolio_value) VALUES (?, ?, ?, ?)',
        [result.insertId, row.year, row.invested, row.portfolio_value]
      )
    );
    await Promise.all(breakdownPromises);

    res.status(201).json({
      id: result.insertId,
      session_id: newSessionId,
      inputs: {
        goal_name,
        ...inputs
      },
      results,
      yearly_breakdown: yearlyBreakdown,
      created_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating calculation:', error);
    res.status(500).json({ error: 'Failed to create calculation' });
  }
});

// GET /api/calculations - Get calculations by session_id
router.get('/', async (req, res) => {
  try {
    const { session_id, limit = 50 } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: 'session_id query parameter is required' });
    }

    const [rows] = await pool.execute(
      `SELECT id, goal_name, current_cost, years, inflation_rate, expected_return,
              future_goal_value, required_sip, total_invested, expected_wealth,
              is_saved, notes, created_at
       FROM calculations
       WHERE session_id = ?
       ORDER BY created_at DESC
       LIMIT ?`,
      [session_id, parseInt(limit)]
    );

    res.json({
      session_id,
      calculations: rows
    });

  } catch (error) {
    console.error('Error fetching calculations:', error);
    res.status(500).json({ error: 'Failed to fetch calculations' });
  }
});

// GET /api/calculations/:id - Get single calculation with yearly breakdown
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get calculation
    const [calcRows] = await pool.execute(
      `SELECT * FROM calculations WHERE id = ?`,
      [id]
    );

    if (calcRows.length === 0) {
      return res.status(404).json({ error: 'Calculation not found' });
    }

    const calculation = calcRows[0];

    // Get yearly breakdown
    const [breakdownRows] = await pool.execute(
      `SELECT year_number, invested_amount, portfolio_value
       FROM yearly_breakdown
       WHERE calculation_id = ?
       ORDER BY year_number`,
      [id]
    );

    res.json({
      ...calculation,
      yearly_breakdown: breakdownRows
    });

  } catch (error) {
    console.error('Error fetching calculation:', error);
    res.status(500).json({ error: 'Failed to fetch calculation' });
  }
});

// PATCH /api/calculations/:id - Update calculation (save/notes)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_saved, notes } = req.body;

    const updates = [];
    const values = [];

    if (is_saved !== undefined) {
      updates.push('is_saved = ?');
      values.push(is_saved);
    }

    if (notes !== undefined) {
      updates.push('notes = ?');
      values.push(notes);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);

    await pool.execute(
      `UPDATE calculations SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.json({ message: 'Calculation updated successfully' });

  } catch (error) {
    console.error('Error updating calculation:', error);
    res.status(500).json({ error: 'Failed to update calculation' });
  }
});

// DELETE /api/calculations/:id - Delete calculation
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { session_id } = req.query;

    // Verify ownership
    const [rows] = await pool.execute(
      'SELECT session_id FROM calculations WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Calculation not found' });
    }

    if (rows[0].session_id !== session_id) {
      return res.status(403).json({ error: 'Not authorized to delete this calculation' });
    }

    await pool.execute('DELETE FROM calculations WHERE id = ?', [id]);

    res.json({ message: 'Calculation deleted successfully' });

  } catch (error) {
    console.error('Error deleting calculation:', error);
    res.status(500).json({ error: 'Failed to delete calculation' });
  }
});

// POST /api/calculations/simulate - Run simulation without saving
router.post('/simulate', calculationValidation, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { current_cost, years, inflation_rate, expected_return } = req.body;

    const inputs = {
      current_cost: parseFloat(current_cost),
      years: parseInt(years),
      inflation_rate: parseFloat(inflation_rate),
      expected_return: parseFloat(expected_return)
    };

    const results = calculateAll(inputs);
    const yearlyBreakdown = generateYearlyBreakdown(results.required_sip, inputs.expected_return, inputs.years);

    res.json({
      inputs,
      results,
      yearly_breakdown: yearlyBreakdown
    });

  } catch (error) {
    console.error('Error running simulation:', error);
    res.status(500).json({ error: 'Failed to run simulation' });
  }
});

module.exports = router;
