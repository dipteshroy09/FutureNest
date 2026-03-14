// API service for communicating with the FutureNest backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generate or retrieve session ID for anonymous users
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = localStorage.getItem('futurenest_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('futurenest_session_id', sessionId);
  }
  return sessionId;
}

export interface CalculationInput {
  goal_name: string;
  current_cost: number;
  years: number;
  inflation_rate: number;
  expected_return: number;
}

export interface CalculationResult {
  future_goal_value: number;
  required_sip: number;
  total_invested: number;
  expected_wealth: number;
}

export interface Calculation extends CalculationInput, CalculationResult {
  id: number;
  session_id: string;
  is_saved: boolean;
  notes: string | null;
  created_at: string;
}

export interface YearlyBreakdown {
  year: number;
  invested: number;
  portfolio_value: number;
}

export interface CalculationWithBreakdown extends Calculation {
  yearly_breakdown: YearlyBreakdown[];
}

// Save a calculation to the backend
export async function saveCalculation(input: CalculationInput): Promise<Calculation> {
  const sessionId = getSessionId();
  
  const response = await fetch(`${API_BASE_URL}/calculations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...input,
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save calculation');
  }

  return response.json();
}

// Get all calculations for current session
export async function getCalculations(limit?: number): Promise<Calculation[]> {
  const sessionId = getSessionId();
  const url = new URL(`${API_BASE_URL}/calculations`);
  url.searchParams.append('session_id', sessionId);
  if (limit) url.searchParams.append('limit', limit.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch calculations');
  }

  const data = await response.json();
  return data.calculations;
}

// Get single calculation with yearly breakdown
export async function getCalculation(id: number): Promise<CalculationWithBreakdown> {
  const response = await fetch(`${API_BASE_URL}/calculations/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch calculation');
  }

  return response.json();
}

// Update calculation (save/unsave or add notes)
export async function updateCalculation(
  id: number,
  updates: { is_saved?: boolean; notes?: string }
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/calculations/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update calculation');
  }
}

// Delete a calculation
export async function deleteCalculation(id: number): Promise<void> {
  const sessionId = getSessionId();
  const response = await fetch(
    `${API_BASE_URL}/calculations/${id}?session_id=${sessionId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete calculation');
  }
}

// Run simulation without saving
export async function simulateCalculation(input: CalculationInput): Promise<{
  inputs: CalculationInput;
  results: CalculationResult;
  yearly_breakdown: YearlyBreakdown[];
}> {
  const response = await fetch(`${API_BASE_URL}/calculations/simulate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to run simulation');
  }

  return response.json();
}

// Health check
export async function checkHealth(): Promise<{ status: string; service: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}
