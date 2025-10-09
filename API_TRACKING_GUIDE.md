# 📡 API Tracking Implementation Guide

## Overview

This guide details how to implement real usage tracking for each AI service based on October 2025 research.

## 1. Claude (Anthropic) ✅ Best Support

### Official API: Usage & Cost API
- **Endpoint**: `https://api.anthropic.com/v1/organizations/usage_report/messages`
- **Authentication**: Admin API key with `usage:read` scope
- **API Version**: `2025-01-31`

### Implementation

```typescript
async function fetchClaudeUsage(apiKey: string) {
  const response = await fetch(
    'https://api.anthropic.com/v1/organizations/usage_report/messages',
    {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2025-01-31',
      },
      // Query params: time_bucket=1d, start_time, end_time
    }
  );

  const data = await response.json();

  // Returns token consumption breakdown:
  // - uncached_input_tokens
  // - cached_input_tokens
  // - cache_creation_tokens
  // - output_tokens
  // Grouped by model, workspace, service tier

  return data;
}
```

### Available Data
- ✅ Historical usage by model
- ✅ Token breakdowns (input/output/cached/cache creation)
- ✅ Cost data
- ✅ Workspace-level tracking
- ✅ Time buckets (1m, 1h, 1d)

### Additional Tools
- **Grafana Cloud Integration**: Pre-built dashboards (August 2025)
- **Claude-Code-Usage-Monitor**: CLI tool for real-time monitoring
- **Browser Extension**: Chrome Web Store has usage tracker

**Documentation**: https://docs.claude.com/en/api/usage-cost-api

---

## 2. OpenAI (ChatGPT/Codex) ✅ Good Support

### Official API: Usage API
- **Endpoint**: `https://api.openai.com/v1/usage`
- **Authentication**: Organization Owner API key
- **Dashboard**: https://platform.openai.com/usage

### Implementation

```typescript
async function fetchOpenAIUsage(apiKey: string) {
  const response = await fetch(
    'https://api.openai.com/v1/usage',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      // Query params: date range, project filters
    }
  );

  const data = await response.json();

  // Returns usage by:
  // - Model (GPT-4o, Codex, etc.)
  // - Time period
  // - Cost
  // - Tokens consumed

  return data;
}
```

### Available Data
- ✅ Usage by model
- ✅ Cost per API call
- ✅ Token consumption (TPM - tokens per minute)
- ✅ Project-level filtering
- ✅ 1-minute granularity
- ✅ Last 30 days by default

### ChatGPT Plus Specific
- **Codex Messages**: Available in dashboard
- **Limit**: 150 messages per 5 hours (Plus plan)
- **Cloud Tasks**: Don't count until October 20, 2025

**Documentation**: https://platform.openai.com/docs/api-reference/usage

---

## 3. Gemini (Google AI) ⚠️ Requires Billing

### Official API: Google AI Studio
- **Endpoint**: Google AI Studio billing API / Cloud Monitoring
- **Authentication**: Google AI Studio API key
- **Requirement**: Cloud Billing must be enabled

### Implementation

```typescript
async function fetchGeminiUsage(apiKey: string) {
  // Option 1: Google AI Studio dashboard monitoring
  // Access via: https://ai.google.dev/

  // Option 2: Cloud Monitoring API (Enterprise)
  const response = await fetch(
    'https://monitoring.googleapis.com/v3/projects/{PROJECT_ID}/timeSeries',
    {
      method: 'GET',
      headers: {
        'X-goog-api-key': apiKey,
      },
    }
  );

  const data = await response.json();
  return data;
}
```

### Available Data
- ✅ Token consumption by model
- ✅ Rate limit tracking (RPD - requests per day)
- ✅ Usage tier information
- ✅ Cost tracking (with Cloud Billing)
- ⚠️ Requires Cloud Monitoring for programmatic access

### Pricing Tiers
- **Free Tier**: Lower rate limits
- **Pay-as-you-go**: Higher limits, resets midnight Pacific
- **Q2 2025 Update**: 22% cost reduction for high-volume usage

### Gemini Code Assist (Enterprise)
- **Monitoring**: Automatic metrics in Cloud Monitoring
- **Dashboard**: Pre-built visualization tools
- **Metrics**: Daily active users, feature usage

**Documentation**: https://ai.google.dev/gemini-api/docs/billing

---

## 4. Cursor ⚠️ Limited API Access

### Challenge: No Public API for Pro Users

#### Option A: Enterprise Only - AI Code Tracking API ✅
- **Endpoint**: Available via Cursor Enterprise plan
- **Features**:
  - Commits API (tracks lines added/deleted, tab/composer lines)
  - Changes API (AI changes grouped by changeId)
  - Model usage tracking
  - File-level metadata

```typescript
// Enterprise only
async function fetchCursorUsage(token: string) {
  const response = await fetch(
    'https://api.cursor.com/v1/usage/commits',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      // Query params: user, date range, repository
    }
  );

  return response.json();
}
```

#### Option B: Dashboard Tracking (Manual) 📊
- **URL**: https://cursor.com/settings
- **Shows**: Fast requests consumed, Premium model usage
- **Method**: Navigate to dashboard to check usage
- **Limitation**: Must be checked manually

#### Option C: Third-Party Tools 🔧
- **macOS Menu Bar Widgets**: Real-time tracking
- **Community Extensions**: IDE-integrated trackers
- **Example**: Cursor Usage Widget (https://cursorusage.com/)

### Available Data (Enterprise)
- ✅ Commit-level metrics
- ✅ AI changes breakdown
- ✅ Model usage (tab/composer/chat)
- ✅ User-level tracking
- ❌ Not available for Pro/Free tiers

### Pro Plan Tracking Strategy
1. **Manual Dashboard Checks**: Visit settings regularly
2. **Third-Party Widgets**: Use community tools for real-time monitoring
3. **Usage Patterns**: Track manually in spreadsheet
4. **API Request**: Consider requesting pro-level API access from Cursor

**Documentation**: https://docs.cursor.com/account/teams/ai-code-tracking-api

---

## Implementation Priority

### Tier 1: Easy API Integration ✅
1. **Claude**: Best API support, comprehensive data
2. **OpenAI**: Excellent API, good documentation

### Tier 2: Requires Setup ⚠️
3. **Gemini**: Requires Cloud Billing, good for enterprise

### Tier 3: Manual/Limited 📊
4. **Cursor**: Manual dashboard or third-party tools (Enterprise API only)

---

## Recommended Implementation Approach

### Phase 1: Core API Integration
```typescript
// Start with Claude and OpenAI
const tracker = new UsageTracker({
  claudeApiKey: process.env.CLAUDE_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
});

const usage = await Promise.all([
  tracker.fetchClaudeUsage(),
  tracker.fetchOpenAIUsage(),
]);
```

### Phase 2: Add Gemini (If Cloud Billing Enabled)
```typescript
// Add Gemini if you have billing configured
const geminiUsage = await tracker.fetchGeminiUsage();
```

### Phase 3: Manual Cursor Tracking
```typescript
// For Pro users: Manual input or third-party widget
// Update via settings interface:

function updateCursorUsageManually() {
  return {
    fastRequests: 320, // Check from cursor.com/settings
    premiumRequests: 45,
    maxFastRequests: 500,
    maxPremiumRequests: 100,
  };
}
```

---

## Security Best Practices

### Environment Variables
```bash
# .env
CLAUDE_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AI...
CURSOR_TOKEN=... # Enterprise only
```

### Key Permissions
- **Claude**: Admin key with `usage:read` scope only
- **OpenAI**: Organization Owner (required for usage API)
- **Gemini**: API key with Monitoring API access
- **Cursor**: Team admin access (Enterprise)

### Rate Limiting
- Implement caching (15-minute intervals minimum)
- Batch requests where possible
- Use webhooks if available (future)

---

## Testing Your Implementation

### 1. Validate API Keys
```typescript
async function testAPIKeys() {
  const tests = [
    { name: 'Claude', fn: () => tracker.fetchClaudeUsage() },
    { name: 'OpenAI', fn: () => tracker.fetchOpenAIUsage() },
    { name: 'Gemini', fn: () => tracker.fetchGeminiUsage() },
  ];

  for (const test of tests) {
    try {
      await test.fn();
      console.log(`✅ ${test.name} API working`);
    } catch (error) {
      console.error(`❌ ${test.name} API failed:`, error);
    }
  }
}
```

### 2. Verify Data Structure
Check that returned data matches expected format:
- Claude: Token breakdowns by model
- OpenAI: Usage by project/API key
- Gemini: Token consumption by model
- Cursor: Commit/change metrics (Enterprise)

---

## October 2025 Updates

### Recent Changes
- ✅ Claude Usage & Cost API now GA
- ✅ Grafana Cloud integration for Claude (August 2025)
- ✅ OpenAI 1-minute granularity now available
- ⚠️ OpenAI cloud tasks don't count until Oct 20, 2025
- ✅ Gemini Q2 2025: 22% cost reduction
- ⚠️ Cursor API still Enterprise-only

### Future Roadmap
- Expected: More granular Cursor usage APIs
- Anticipated: Real-time usage webhooks
- Possible: Unified AI usage aggregation APIs

---

## Support Resources

### Official Documentation
- **Claude**: https://docs.claude.com/en/api/usage-cost-api
- **OpenAI**: https://platform.openai.com/docs/guides/usage
- **Gemini**: https://ai.google.dev/gemini-api/docs
- **Cursor**: https://docs.cursor.com/

### Community Tools
- **Claude Monitor**: https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor
- **Cursor Widget**: https://cursorusage.com/
- **Grafana Dashboards**: Available via Grafana Cloud

### Issues & Support
- Check service status pages for outages
- API keys require appropriate scopes/permissions
- Rate limits vary by plan tier

---

Built with research from October 2025 API documentation and community tools.
