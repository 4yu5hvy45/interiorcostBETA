
export type BudgetLevel = 'Minimal' | 'Moderate' | 'Significant';
export type Mood = 'Calm & Minimal' | 'Warm & Cozy' | 'Professional & Sharp' | 'Vibrant & Desi';

export interface Verdict {
  verdict: string;
  estimated_cost: string;
  worth_fixing: string[];
  avoid_spending_on: string[];
  reasoning: string;
}

export type MessageRole = 'assistant' | 'user';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text?: string;
  image?: string;
  isVerdict?: boolean;
  verdictData?: Verdict;
  isVisualization?: boolean;
  visualizationImage?: string;
  options?: string[];
  isLoading?: boolean;
}

export type ChatStep = 'UPLOAD_PHOTO' | 'SELECT_BUDGET' | 'SELECT_MOOD' | 'ANALYZING' | 'COMPLETED';
