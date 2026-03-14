const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

// GET /api/users/:id/calculations - Get user's saved calculations
router.get('/:id/calculations', async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 50 } = req.query;

    const [rows] = await pool.execute(
      `SELECT id, goal_name, current_cost, years, inflation_rate, expected_return,
              future_goal_value, required_sip, total_invested, expected_wealth,
              is_saved, notes, created_at
       FROM calculations
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT ?`,
      [id, parseInt(limit)]
    );

    res.json({
      user_id: id,
      calculations: rows
    });

  } catch (error) {
    console.error('Error fetching user calculations:', error);
    res.status(500).json({ error: 'Failed to fetch user calculations' });
  }
});

// GET /api/users/stats - Get aggregate statistics (for admin/analytics)
router.get('/stats/overview', async (req, res) => {
  try {
    // Stats by goal type
    const [goalStats] = await pool.execute(
      `SELECT 
        goal_name,
        COUNT(*) as count,
        AVG(required_sip) as avg_sip,
        AVG(expected_wealth) as avg_wealth,
        AVG(years) as avg_years
       FROM calculations
       GROUP BY goal_name
       ORDER BY count DESC`
    );

    // Total calculations count
    const [totalCount] = await pool.execute(
      'SELECT COUNT(*) as total FROM calculations'
    );

    // Recent activity
    const [recentActivity] = await pool.execute(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM calculations
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date`
    );

    res.json({
      total_calculations: totalCount[0].total,
      goal_breakdown: goalStats,
      recent_activity: recentActivity
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
