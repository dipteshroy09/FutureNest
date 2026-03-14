# FutureNest

**Smart, Inflation-Aware Investment Planning for India's Future**

> **For Judges**: Complete project details, architecture, and technical documentation available in **[Documentation.md](./Documentation.md)**

> **Video Demo**: [Watch Project Demo](./assets/videos/FutureNest-Demo.mp4)

FutureNest is a goal-based investment calculator that factors in inflation to show you the *real* monthly SIP required to achieve your financial goals. Unlike standard calculators that ignore rising costs, FutureNest ensures you save enough to actually meet your targets.

---

## Why FutureNest?

### The Problem with Standard SIP Calculators

Most free calculators have a critical flaw: they assume a ₹10 lakh goal today will still cost ₹10 lakh 15 years from now. This is obviously wrong.

**Example — Education Planning:**
- Engineering degree costs ₹10 lakh today
- At 6% inflation, it will cost ₹21.6 lakh in 15 years
- Traditional calculator says: Save ₹26,000/month
- **Reality:** You need ₹56,000/month
- **Gap:** ₹30,000/month shortfall

FutureNest closes this gap by baking inflation directly into every calculation.

### Key Differentiators

- **Inflation-Integrated Math**: Not an afterthought — inflation is core to every projection
- **Real-Time Visualizations**: Watch your wealth grow year-by-year with interactive charts
- **Early vs Late Comparison**: See the exact rupee cost of procrastination
- **Smart Insights**: Personalized recommendations based on your inputs
- **Save Calculations**: Compare different scenarios side-by-side

---

## Features

### Core Calculator
- **8 Goal Types**: Education, House, Wedding, Travel, Car, Retirement, Emergency Fund, Custom
- **Real-Time Computation**: Instant SIP calculation as you adjust parameters
- **Inflation Projection**: Future cost based on inflation rates
- **Responsive Sliders**: Intuitive controls for amount, years, returns, and inflation

### Advanced Analysis
- **Investment Growth Charts**: Year-by-year portfolio visualization
- **Early vs Late Comparison**: Side-by-side scenario analysis
- **Inflation Impact Meter**: Visual representation of cost increases
- **Smart Insights**: Personalized financial recommendations

### Data Persistence
- **Calculation History**: Save and retrieve past calculations
- **MySQL Backend**: Robust data storage
- **UUID Tracking**: Unique identifier for each calculation

### User Experience
- **Glassmorphism UI**: Modern, visually appealing interface
- **Smooth Animations**: Framer Motion powered transitions
- **Mobile Responsive**: Works seamlessly on all devices
- **Dark Theme**: Eye-friendly financial dashboard

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Smooth animations & transitions |
| **Recharts** | Interactive data visualization |
| **Lucide React** | Modern icon library |
| **Three.js** | 3D visual elements |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MySQL** | Relational data storage |
| **mysql2** | Database driver |
| **CORS** | Cross-origin handling |
| **dotenv** | Environment management |

### Testing
- **Playwright**: End-to-end testing

---

## Financial Mathematics

### Future Value with Inflation
```
FV = Present Cost × (1 + Inflation Rate)^Years
```
Calculates the actual future cost of your goal accounting for inflation.

### Monthly SIP Calculation
```
r = Annual Return / 12 (monthly rate)
n = Years × 12 (total months)
SIP = FV × r ÷ [((1 + r)^n − 1) × (1 + r)]
```
Determines the exact monthly investment needed.

### Expected Wealth Projection
```
Wealth = SIP × [((1 + r)^n - 1) / r] × (1 + r)
```
Projects total portfolio value at goal date.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/futurenest.git
   cd futurenest
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=futurenest
   PORT=5000
   ```

5. **Initialize the database**
   ```bash
   cd backend
   npm run init-db
   cd ..
   ```

6. **Start the development servers**

   Terminal 1 — Frontend:
   ```bash
   npm run dev
   ```

   Terminal 2 — Backend:
   ```bash
   cd backend
   npm run dev
   ```

7. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
futurenest/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx             # Landing page with calculator
│   │   ├── analysis/            # Investment analysis dashboard
│   │   ├── advanced-analysis/   # Deep-dive analytics
│   │   │   ├── early-vs-late/   # Procrastination cost analyzer
│   │   │   ├── inflation/       # Inflation impact visualization
│   │   │   ├── insights/        # Smart recommendations
│   │   │   ├── scenario-testing/# What-if scenarios
│   │   │   └── timeline/        # Detailed projections
│   │   ├── history/             # Saved calculations
│   │   ├── insights/            # Smart recommendations
│   │   └── about/               # How it works
│   ├── components/              # React components
│   │   ├── Hero.tsx             # Main calculator interface
│   │   ├── HowItWorks.tsx       # Feature explanation
│   │   ├── InvestmentChart.tsx    # Growth visualization
│   │   ├── InflationChart.tsx    # Inflation analysis
│   │   ├── EarlyVsLate.tsx      # Comparison tool
│   │   ├── PortfolioSimulator.tsx # Scenario testing
│   │   └── ...
│   ├── context/                 # React Context
│   │   └── CalculatorContext.tsx # Global state management
│   ├── hooks/                   # Custom hooks
│   │   └── useCalculator.ts     # Calculation logic hook
│   └── lib/                     # Utilities
│       └── calculations.ts      # Financial math engine
├── backend/                     # Express.js API
│   ├── server.js                # Main server
│   ├── config/database.js      # DB configuration
│   └── database/
│       ├── init.js              # Schema initialization
│       └── schema.sql           # Database schema
└── public/                      # Static assets
```

---

## Use Cases

### 1. Education Planning
Parents can calculate exact SIP needed for child's higher education, accounting for rising education costs.

**Example**: Engineering degree costing ₹10 lakh today will cost ₹21.6 lakh in 15 years at 6% inflation.

### 2. Home Purchase Planning
Prospective homeowners can plan their down payment or full purchase with inflation-adjusted targets.

### 3. Retirement Corpus
Young professionals can start early and visualize the power of compounding over 30+ years.

### 4. Wedding Fund
Plan for the big day with realistic cost projections.

### 5. Emergency Fund
Calculate how much you need to save for a safety net that actually covers future expenses.

---

## Available Scripts

### Frontend
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

### Backend
- `npm run dev` — Start development server with nodemon
- `npm run init-db` — Initialize database schema
---

## Roadmap
- [ ] Monte Carlo simulations for risk assessment
- [ ] Goal probability calculator
- [ ] Asset allocation recommendations
- [ ] Tax efficiency optimizer

### Phase 3 — Ecosystem Integration
- [ ] Direct mutual fund integration
- [ ] Bank SIP setup automation
- [ ] Portfolio tracking from AMCs
- [ ] Financial advisor marketplace

### Phase 4 — Smart Features
- [ ] Market trend indicators
- [ ] Goal-based recommendations
- [ ] Risk assessment questionnaires
- [ ] Rebalancing reminders

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Documentation

For comprehensive project information, see **[Documentation.md](./Documentation.md)** which includes:
- Detailed feature explanations
- Architecture and tech stack breakdown
- Financial mathematics formulas
- Use cases with real-world examples
- Business impact analysis
- Roadmap and future phases
- Developer credits

---

## Acknowledgments

- Built with modern web technologies and financial mathematics
- Inspired by the need for accurate financial planning tools in India
- UI design influenced by glassmorphism trends and premium fintech applications

---

## Contact

For questions or feedback, please open an issue on GitHub.

---

**FutureNest** — *Plan smart. Save right. Achieve goals.*
