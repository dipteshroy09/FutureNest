-- FutureNest Database Schema
-- MySQL Database for Goal-Based Investment Calculator

-- Create database
CREATE DATABASE IF NOT EXISTS futurenest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE futurenest;

-- ============================================
-- Table: users (Optional - for authenticated users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- NULL for anonymous/guest users
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

-- ============================================
-- Table: calculations (Core Entity)
-- Stores all user calculations with inputs and computed results
-- ============================================
CREATE TABLE IF NOT EXISTS calculations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign key (nullable for anonymous calculations)
    user_id INT NULL,
    
    -- Session identifier for anonymous users
    session_id VARCHAR(255) NULL,
    
    -- Input Parameters
    goal_name VARCHAR(50) NOT NULL,
    current_cost DECIMAL(15, 2) NOT NULL,
    years INT NOT NULL CHECK (years > 0 AND years <= 50),
    inflation_rate DECIMAL(5, 2) NOT NULL DEFAULT 6.00,
    expected_return DECIMAL(5, 2) NOT NULL DEFAULT 12.00,
    
    -- Calculated Results
    future_goal_value DECIMAL(15, 2) NOT NULL,
    required_sip DECIMAL(12, 2) NOT NULL,
    total_invested DECIMAL(15, 2) NOT NULL,
    expected_wealth DECIMAL(15, 2) NOT NULL,
    
    -- Metadata
    is_saved BOOLEAN DEFAULT FALSE, -- User can "save/star" important calculations
    notes TEXT NULL, -- Optional user notes
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at),
    INDEX idx_goal_name (goal_name),
    
    -- Foreign key constraint
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- Table: yearly_breakdown (Optional - for detailed projections)
-- Stores year-by-year portfolio growth data
-- ============================================
CREATE TABLE IF NOT EXISTS yearly_breakdown (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calculation_id INT NOT NULL,
    year_number INT NOT NULL,
    invested_amount DECIMAL(15, 2) NOT NULL,
    portfolio_value DECIMAL(15, 2) NOT NULL,
    
    FOREIGN KEY (calculation_id) REFERENCES calculations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_year_per_calc (calculation_id, year_number)
) ENGINE=InnoDB;

-- ============================================
-- Table: calculation_shares (Optional - for sharing calculations)
-- ============================================
CREATE TABLE IF NOT EXISTS calculation_shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calculation_id INT NOT NULL,
    share_token VARCHAR(64) UNIQUE NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NULL,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (calculation_id) REFERENCES calculations(id) ON DELETE CASCADE,
    INDEX idx_share_token (share_token)
) ENGINE=InnoDB;

-- ============================================
-- Sample Queries for Reference
-- ============================================

-- Get all calculations for a user/session
-- SELECT * FROM calculations WHERE user_id = ? OR session_id = ? ORDER BY created_at DESC;

-- Get calculation with yearly breakdown
-- SELECT c.*, yb.year_number, yb.invested_amount, yb.portfolio_value
-- FROM calculations c
-- LEFT JOIN yearly_breakdown yb ON c.id = yb.calculation_id
-- WHERE c.id = ?;

-- Get statistics by goal type
-- SELECT 
--     goal_name,
--     COUNT(*) as count,
--     AVG(required_sip) as avg_sip,
--     AVG(expected_wealth) as avg_wealth
-- FROM calculations
-- GROUP BY goal_name;
