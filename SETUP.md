# 🚀 Setup Guide

## Current Status

✅ **Development server running at**: http://localhost:5173

## What You Have

### Working Dashboard
- **4 Service Cards**: Claude, Cursor, Gemini, OpenAI with full stats
- **Smart Summary Card**: Shows $260/month spend with $100 savings opportunity
- **Usage Chart**: 30-day trend visualization
- **Recommendation Engine**: Suggests Claude $200 → $100 downgrade

### Demo Data Loaded
All services showing realistic usage patterns:
- **Claude Max $200**: 60% usage (540/900 messages per 5 hours)
- **Cursor Pro $20**: 64% usage (320/500 fast requests per month)
- **Gemini AI $20**: 30% usage (1.2M/4M tokens per month)
- **ChatGPT Plus $20**: 61% usage (92/150 Codex messages per 5 hours)

## Next Steps

### 1. View the Dashboard
Open your browser to: **http://localhost:5173**

You should see:
- Gradient summary card with spending overview
- Line chart showing 30-day trends
- 4 service cards in a grid layout
- Smart recommendations (Claude downgrade highlighted)

### 2. Configure Real API Tracking (Optional)

#### Get Your API Keys

**Claude (Anthropic)**
1. Go to https://console.anthropic.com/settings/keys
2. Create an Admin API key with `usage:read` scope
3. Copy the key (starts with `sk-ant-`)

**OpenAI**
1. Go to https://platform.openai.com/api-keys
2. Create an API key with Organization Owner permissions
3. Copy the key (starts with `sk-`)

**Gemini (Google AI)**
1. Go to https://ai.google.dev/
2. Enable Cloud Billing in Google AI Studio
3. Generate API key

**Cursor**
- **Enterprise**: Use AI Code Tracking API
- **Pro**: Manual tracking via https://cursor.com/settings

#### Configure in Code

Edit `src/lib/apiIntegration.ts` and add your keys:

```typescript
const tracker = new UsageTracker({
  claudeApiKey: 'sk-ant-your-key-here',
  openaiApiKey: 'sk-your-key-here',
  geminiApiKey: 'AI-your-key-here',
});

// Then use in Dashboard.tsx
const usage = await tracker.fetchAllUsage();
```

### 3. Customize Your Dashboard

#### Change Theme
Edit `tailwind.config.js`:
```javascript
daisyui: {
  themes: ["dark"], // Try: "dark", "cupcake", "cyberpunk", "synthwave"
}
```

#### Adjust Demo Data
Edit `src/lib/demoData.ts` to match your actual usage patterns.

#### Add New Services
Add more AI services you use (e.g., Perplexity, Claude.ai Pro):
```typescript
{
  id: 'perplexity',
  name: 'Perplexity Pro',
  icon: '🔍',
  currentPlan: 'Pro $20/month',
  monthlyCost: 20,
  usage: { current: 150, max: 300, unit: 'searches', resetPeriod: 'monthly' },
  features: ['Unlimited searches', 'Pro search', 'File uploads'],
  trackingMethod: 'manual'
}
```

## Understanding the Recommendation Algorithm

### How It Works

**Usage < 50%** → Suggests downgrade
- Example: Claude at 60% usage → Recommends $100 plan instead of $200

**Usage < 20%** → Suggests cancellation
- Example: Service barely used → "Consider canceling to save $X"

**Usage > 90%** → Warns about capacity
- Example: Near limit → "You may hit your limit soon"

### Current Recommendations

Based on your demo data:
1. **💰 Downgrade Claude to $100 Max Plan** (Save $100/month)
   - You're using 540/900 messages (60%)
   - $100 plan offers 225 messages per 5 hours
   - Still sufficient for your needs

2. **🔍 Low Gemini Usage**
   - Only 30% utilized (1.2M/4M tokens)
   - Consider if you need the $20/month plan

## Build for Production

When ready to deploy:

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel/Netlify/etc
# Upload the 'dist' folder
```

## Troubleshooting

### Dev Server Won't Start
```bash
# Kill any process on port 5173
lsof -ti:5173 | xargs kill -9

# Restart
npm run dev
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

### Styling Issues
```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/index.css -o ./dist/output.css
```

## Project Structure

```
ai-usage-tracker/
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── SummaryCard.tsx
│   │   └── UsageChart.tsx
│   ├── lib/              # Business logic
│   │   ├── types.ts
│   │   ├── demoData.ts
│   │   ├── usageCalculator.ts
│   │   └── apiIntegration.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Tech Stack Reference

- **React 18**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Vite**: https://vite.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **DaisyUI**: https://daisyui.com/
- **Recharts**: https://recharts.org/

## Support

- Check [README.md](README.md) for full documentation
- View component source code for customization examples
- DaisyUI components: https://daisyui.com/components/

---

🎉 **You're all set!** Open http://localhost:5173 and start tracking your AI usage!
