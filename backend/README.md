# FutureNest Backend

Node.js 22.11.0 + Express + MySQL backend for the FutureNest Goal-Based Investment Calculator.

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
copy env.example .env
```

Edit `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=futurenest
PORT=3001
```

### 3. Initialize Database

```bash
npm run db:init
```

This creates the database and tables automatically.

### 4. Start Server

```bash
npm run dev      # Development with auto-reload
npm start        # Production mode
```

Server runs at `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Calculations
- `POST /api/calculations` - Create calculation (saves to DB)
- `GET /api/calculations?session_id=xxx` - List calculations
- `GET /api/calculations/:id` - Get single calculation with breakdown
- `PATCH /api/calculations/:id` - Update (save/notes)
- `DELETE /api/calculations/:id` - Delete calculation
- `POST /api/calculations/simulate` - Run simulation (no save)

### Users & Stats
- `GET /api/users/:id/calculations` - User's calculations
- `GET /api/users/stats/overview` - Aggregate statistics

## Data Stored

Each calculation stores:
- **Inputs**: goal_name, current_cost, years, inflation_rate, expected_return
- **Results**: future_goal_value, required_sip, total_invested, expected_wealth
- **Metadata**: session_id, created_at, is_saved, notes
- **Yearly Breakdown**: Year-by-year portfolio projection

## Database Schema

```
users
├── id (PK)
├── email
├── name
└── created_at

calculations
├── id (PK)
├── user_id (FK, nullable)
├── session_id (for anonymous users)
├── goal_name
├── current_cost
├── years
├── inflation_rate
├── expected_return
├── future_goal_value
├── required_sip
├── total_invested
├── expected_wealth
├── is_saved
├── notes
└── created_at

yearly_breakdown
├── id (PK)
├── calculation_id (FK)
├── year_number
├── invested_amount
└── portfolio_value
```
