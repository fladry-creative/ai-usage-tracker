export type ServiceName = 'claude' | 'cursor' | 'gemini' | 'openai';

export interface UsageLimit {
  current: number;
  max: number;
  unit: string; // 'messages', 'requests', 'tokens', etc.
  resetPeriod: string; // '5 hours', 'daily', 'monthly'
}

export interface ModelUsage {
  name: string;
  current: number;
  max: number;
  unit: string;
}

export interface ServiceData {
  id: ServiceName;
  name: string;
  icon: string;
  currentPlan: string;
  monthlyCost: number;
  usage: UsageLimit;
  modelUsage?: ModelUsage[];
  features: string[];
  apiEndpoint?: string;
  trackingMethod: 'api' | 'manual' | 'dashboard';
}

export interface UsageDataPoint {
  date: string;
  claude: number;
  cursor: number;
  gemini: number;
  openai: number;
}

export interface Recommendation {
  type: 'upgrade' | 'downgrade' | 'cancel' | 'optimize';
  severity: 'high' | 'medium' | 'low';
  service: ServiceName;
  title: string;
  description: string;
  potentialSavings?: number;
  icon: string;
}

export interface DashboardSummary {
  totalMonthlySpend: number;
  totalUsagePercentage: number;
  recommendations: Recommendation[];
  projectedSpend: number;
}
