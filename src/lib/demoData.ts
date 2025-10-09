import { ServiceData, UsageDataPoint } from './types';

export const servicesData: ServiceData[] = [
  {
    id: 'claude',
    name: 'Claude Max',
    icon: '🤖',
    currentPlan: 'Max $200/month',
    monthlyCost: 200,
    usage: {
      current: 540,
      max: 900,
      unit: 'messages',
      resetPeriod: '5 hours'
    },
    modelUsage: [
      { name: 'Sonnet 4.5', current: 360, max: 480, unit: 'hours' },
      { name: 'Opus 4.1', current: 28, max: 40, unit: 'hours' }
    ],
    features: [
      'Claude Code included',
      '900 messages per 5 hours',
      'Priority access to new features',
      'Advanced research & web search'
    ],
    apiEndpoint: '/v1/organizations/usage_report/messages',
    trackingMethod: 'api'
  },
  {
    id: 'cursor',
    name: 'Cursor Pro',
    icon: '⌨️',
    currentPlan: 'Pro $20/month',
    monthlyCost: 20,
    usage: {
      current: 320,
      max: 500,
      unit: 'fast requests',
      resetPeriod: 'monthly'
    },
    modelUsage: [
      { name: 'Fast requests', current: 320, max: 500, unit: 'requests' },
      { name: 'Premium requests', current: 45, max: 100, unit: 'requests' }
    ],
    features: [
      'Unlimited slow requests',
      '500 fast requests/month',
      'Premium model access',
      'Codebase indexing'
    ],
    apiEndpoint: '/api/usage',
    trackingMethod: 'dashboard'
  },
  {
    id: 'gemini',
    name: 'Gemini AI',
    icon: '✨',
    currentPlan: 'Advanced $20/month',
    monthlyCost: 20,
    usage: {
      current: 1_200_000,
      max: 4_000_000,
      unit: 'tokens',
      resetPeriod: 'monthly'
    },
    modelUsage: [
      { name: 'Gemini 2.5 Pro', current: 800_000, max: 2_500_000, unit: 'tokens' },
      { name: 'Gemini 2.5 Flash', current: 400_000, max: 1_500_000, unit: 'tokens' }
    ],
    features: [
      'Higher rate limits',
      'Priority processing',
      'Extended context window',
      'Cloud monitoring'
    ],
    apiEndpoint: '/v1/usage',
    trackingMethod: 'api'
  },
  {
    id: 'openai',
    name: 'ChatGPT Plus',
    icon: '🔥',
    currentPlan: 'Plus $20/month',
    monthlyCost: 20,
    usage: {
      current: 92,
      max: 150,
      unit: 'messages',
      resetPeriod: '5 hours'
    },
    modelUsage: [
      { name: 'Codex', current: 92, max: 150, unit: 'messages' },
      { name: 'GPT-4o', current: 45, max: 80, unit: 'messages' }
    ],
    features: [
      'Codex access included',
      '150 Codex messages per 5 hours',
      'GPT-4o access',
      'Image generation'
    ],
    apiEndpoint: '/v1/usage',
    trackingMethod: 'api'
  }
];

// Generate 30 days of usage trend data
export const usageTrendData: UsageDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));

  return {
    date: date.toISOString().split('T')[0],
    claude: Math.floor(50 + Math.random() * 30 + i * 0.5), // Trending up
    cursor: Math.floor(30 + Math.random() * 20),
    gemini: Math.floor(20 + Math.random() * 15),
    openai: Math.floor(55 + Math.random() * 20 + i * 0.3) // Trending up
  };
});
