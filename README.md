# 🎯 AI Usage Tracker Dashboard

A beautiful, modern dashboard to track your AI service usage across Claude, Cursor, Gemini, and OpenAI. Built with React, TypeScript, Tailwind CSS, and DaisyUI v5.

![AI Usage Tracker](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5-purple)

## ✨ Features

### 📊 Service Tracking
- **Claude Max**: Track message usage, model-specific breakdowns (Sonnet 4.5, Opus 4.1)
- **Cursor Pro**: Monitor fast/premium request usage
- **Gemini AI**: Track token consumption across models
- **ChatGPT Plus**: Monitor Codex and GPT-4o message usage

### 💡 Smart Recommendations
- **Intelligent Analysis**: Automatically detects underutilized services
- **Cost Optimization**: Suggests plan downgrades when usage is low
- **Alert System**: Warns when approaching usage limits
- **Savings Calculator**: Shows potential monthly savings

### 📈 Visual Analytics
- **30-Day Trends**: Line charts showing usage patterns
- **Progress Bars**: Color-coded usage indicators (green/info/warning/error)
- **Model Breakdowns**: Detailed usage per AI model
- **Summary Stats**: Total spend, average usage, projected costs

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your dashboard!

## 🔧 Configuration

### Demo Data
The dashboard currently runs with demo data showing:
- Claude Max $200/month: 60% usage (540/900 messages)
- Cursor Pro $20/month: 64% usage (320/500 requests)
- Gemini AI $20/month: 30% usage (1.2M/4M tokens)
- ChatGPT Plus $20/month: 61% usage (92/150 messages)

**Total Spend**: $260/month
**Recommended Optimization**: $160/month (Save $100!)

### Real API Integration

To enable real usage tracking, configure your API keys in `src/lib/apiIntegration.ts`:

#### 1. Claude Usage API
```typescript
const tracker = new UsageTracker({
  claudeApiKey: 'sk-ant-...' // Admin API key with usage:read scope
});
```

**API Endpoint**: `https://api.anthropic.com/v1/organizations/usage_report/messages`
**Documentation**: [Claude Usage & Cost API](https://docs.claude.com/en/api/usage-cost-api)

#### 2. OpenAI Usage API
```typescript
const tracker = new UsageTracker({
  openaiApiKey: 'sk-...' // Organization Owner API key
});
```

**API Endpoint**: `https://api.openai.com/v1/usage`
**Documentation**: [OpenAI Usage Dashboard](https://platform.openai.com/usage)

#### 3. Gemini API
```typescript
const tracker = new UsageTracker({
  geminiApiKey: 'AI...' // Google AI Studio API key
});
```

**API Endpoint**: Google AI Studio billing API
**Documentation**: [Gemini API Billing](https://ai.google.dev/gemini-api/docs/billing)

#### 4. Cursor Tracking
**Options**:
- **Enterprise Users**: AI Code Tracking API
- **Pro Users**: Manual dashboard tracking or third-party widgets
- **Documentation**: [Cursor AI Code Tracking API](https://docs.cursor.com/account/teams/ai-code-tracking-api)

## 🎨 Customization

### Themes
DaisyUI comes with multiple themes. Change the theme in `tailwind.config.js`:

```javascript
daisyui: {
  themes: ["light", "dark", "cupcake", "cyberpunk"],
}
```

Then add theme switcher to your dashboard.

### Add New Services
To track additional AI services, add to `src/lib/demoData.ts`:

```typescript
{
  id: 'newservice',
  name: 'New AI Service',
  icon: '🤖',
  currentPlan: 'Pro $30/month',
  monthlyCost: 30,
  usage: { current: 50, max: 100, unit: 'requests', resetPeriod: 'monthly' },
  features: ['Feature 1', 'Feature 2'],
  trackingMethod: 'api'
}
```

## 📋 Key Insights Algorithm

The recommendation engine analyzes your usage patterns and suggests:

### Downgrade Detection
- **Trigger**: Usage < 50% for current plan
- **Action**: Recommends lower-tier plan
- **Example**: Claude $200 → $100 plan (Save $100/month)

### Underutilization Alert
- **Trigger**: Usage < 20% consistently
- **Action**: Suggests cancellation
- **Example**: "Consider canceling Gemini to save $20/month"

### Capacity Warning
- **Trigger**: Usage > 90%
- **Action**: Upgrade suggestion or optimization tips
- **Example**: "High Claude usage detected - optimize prompts or upgrade"

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx      # Main layout component
│   ├── ServiceCard.tsx    # Individual service card
│   ├── SummaryCard.tsx    # Summary with recommendations
│   └── UsageChart.tsx     # 30-day trend visualization
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── demoData.ts        # Demo data
│   ├── usageCalculator.ts # Recommendation engine
│   └── apiIntegration.ts  # API client stubs
├── App.tsx                # App entry point
└── main.tsx               # React root
```

## 🔐 Security Notes

- **Never commit API keys** to version control
- Store API keys in environment variables (`.env`)
- Use the `.gitignore` to exclude sensitive files
- Consider using a secrets manager for production

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **TypeScript 5**: Type-safe development
- **Vite**: Lightning-fast dev server
- **Tailwind CSS 3**: Utility-first CSS
- **DaisyUI 5**: Beautiful UI components
- **Recharts**: Interactive charts

## 📊 Usage Tracking Methods

| Service | Method | Availability |
|---------|--------|--------------|
| Claude | Official Usage & Cost API | ✅ All plans |
| OpenAI | Official Usage API | ✅ All plans |
| Gemini | Google AI Studio API | ✅ With billing enabled |
| Cursor | AI Code Tracking API | ⚠️ Enterprise only |
| Cursor | Manual/Dashboard | ✅ All plans |

## 🎯 Current Demo Scenario

Your current setup shows:
- **Total Monthly Cost**: $260
- **Average Usage**: 54% across all services
- **Top Recommendation**: Downgrade Claude from $200 to $100 plan
- **Potential Savings**: $100/month
- **Optimized Cost**: $160/month

The algorithm identified that you're only using 60% of your Claude Max $200 plan. The $100 Max plan (225 messages per 5 hours) would be sufficient for your needs!

## 🚀 Future Enhancements

- [ ] API key management UI
- [ ] Real-time usage updates
- [ ] Usage alerts & notifications
- [ ] Historical data export (CSV/JSON)
- [ ] Budget setting & tracking
- [ ] Multi-user support
- [ ] Mobile app
- [ ] Slack/Discord notifications

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Built with ❤️ for developers tracking their AI usage
