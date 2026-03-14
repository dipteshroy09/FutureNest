# FutureNest
## Goal-Based Investment Calculator

**Smart financial planning for India's future**

---

## What is FutureNest?

I built this because I noticed most SIP calculators online are too basic. They don't account for inflation, so people end up saving way less than they actually need. FutureNest fixes that - it shows you the real monthly investment required to hit your goals, factoring in how prices rise over time.

### What Makes It Different

- Inflation is built into every calculation (not an afterthought)
- Charts that show your money growing year by year
- A "start now vs later" tool that shows how much procrastination costs you
- Auto-generated insights based on your inputs
- Save your calculations to compare different scenarios later

---

## The Problem I Wanted to Solve

Most free calculators I found had the same flaw: they assume a ₹10 lakh goal today will still cost ₹10 lakh 15 years from now. That's obviously wrong. 

Here is what actually happens:
- An engineering degree costing ₹10L today will run about ₹21.6L in 15 years (at 6% inflation)
- Most calculators tell you to save ₹26,000/month
- Reality? You need about ₹56,000/month
- That's a ₹30,000 gap that leaves you shortchanged

I also noticed people don't realize how expensive waiting is. Start 5 years later, and your monthly SIP jumps significantly. FutureNest shows this visually so you actually feel the cost of delaying.

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

---

## Features

### Core Calculator
- **8 Predefined Goal Types**: Education, House, Wedding, Travel, Car, Retirement, Emergency Fund, Custom
- **Real-time Calculations**: Instant SIP computation as you adjust parameters
- **Inflation Integration**: Future cost projection based on inflation rates
- **Responsive Sliders**: Intuitive input controls for all parameters

### Advanced Analysis
- **Investment Growth Charts**: Year-by-year portfolio visualization
- **Early vs. Late Comparison**: Side-by-side scenario analysis
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

## Financial Mathematics

### Core Formulas

#### 1. Future Value with Inflation
```
FV = Present Cost × (1 + Inflation Rate)^Years
```
Calculates the actual future cost of your goal accounting for inflation.

#### 2. Monthly SIP Calculation
```
r = Annual Return / 12 (monthly rate)
n = Years × 12 (total months)
SIP = FV × r ÷ [((1 + r)^n − 1) × (1 + r)]
```
Determines the exact monthly investment needed.

#### 3. Expected Wealth
```
Wealth = SIP × [((1 + r)^n - 1) / r] × (1 + r)
```
Projects total portfolio value at goal date.

---

## Architecture

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

**Example**: Engineering degree costing ₹10L today will cost ₹21.6L in 15 years at 6% inflation.

### 2. Home Purchase Planning
Prospective homeowners can plan their down payment or full purchase with inflation-adjusted targets.

### 3. Retirement Corpus
Young professionals can start early and visualize the power of compounding over 30+ years.

### 4. Wedding Fund
Plan for the big day with realistic cost projections.

---

## Business Impact

### For Users
- You will save money by starting earlier with smaller monthly amounts
- Get realistic targets instead of discovering you are 30% short later
- Actually see your wealth growing on charts - it keeps you motivated
- Make decisions based on actual numbers, not guesswork

### For Financial Advisors
If you advise clients, you can use the comparison tools to show why starting early matters. The charts make abstract concepts concrete.

---

## Future Roadmap

### Phase 2 - Enhanced Analytics
- [ ] Monte Carlo simulations for risk assessment
- [ ] Goal probability calculator
- [ ] Asset allocation recommendations
- [ ] Tax efficiency optimizer

### Phase 3 - Ecosystem Integration
- [ ] Direct mutual fund integration
- [ ] Bank SIP setup automation
- [ ] Portfolio tracking from AMCs
- [ ] Financial advisor marketplace

### Phase 4 - Smart Features
- Market trend indicators
- Goal-based recommendations
- Risk assessment questionnaires
- Rebalancing reminders

---

## Hackathon Submission Details

### Track
**Fintech / Financial Inclusion**

### Innovation Highlights

1. Most calculators treat inflation as optional. Mine bakes it into the core math.
2. The "Early vs Late" page was something I wish I had when I started investing - it shows the actual rupee cost of waiting
3. UI uses glassmorphism with a dark theme because financial dashboards should look premium, not like Excel
4. All calculations update live as you drag sliders - no "calculate" button needed

### Technical Excellence
- Type-safe full-stack implementation
- Optimized calculation algorithms
- Mobile-first responsive design
- Accessible UI with ARIA labels

---

## Developer

**Built entirely by**: [Your Name]

**Roles Handled**:
- Full Stack Development (Next.js, Express, MySQL)
- Financial Mathematics & Formula Engineering
- UI/UX Design (Glassmorphism, Animations)
- Database Architecture & API Design
- Testing & Deployment

---

## Live Demo

**Local Development**:
```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

**Environment Variables**:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=futurenest
PORT=5000
```

---

## Notes

This was built for a hackathon submission. The math uses standard compound interest formulas, and the UI is React + Tailwind with Framer Motion for animations. Database is MySQL for saving user calculations.

---

*FutureNest - Built for the hackathon*
