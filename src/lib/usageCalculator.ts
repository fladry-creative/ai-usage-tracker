import type { ServiceData, Recommendation, DashboardSummary } from './types';

export function calculateUsagePercentage(current: number, max: number): number {
  return Math.round((current / max) * 100);
}

export function getProgressBarColor(percentage: number): string {
  if (percentage >= 90) return 'error';
  if (percentage >= 75) return 'warning';
  if (percentage >= 50) return 'info';
  return 'success';
}

export function generateRecommendations(services: ServiceData[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Find Claude service
  const claude = services.find(s => s.id === 'claude');
  if (claude) {
    const usagePercent = calculateUsagePercentage(claude.usage.current, claude.usage.max);

    // Key insight: Recommend downgrade if usage < 50%
    if (usagePercent < 50) {
      recommendations.push({
        type: 'downgrade',
        severity: 'high',
        service: 'claude',
        title: 'Downgrade Claude to $100 Max Plan',
        description: `You're using only ${usagePercent}% of your current plan (${claude.usage.current}/${claude.usage.max} messages). The $100 Max plan offers 225 messages per 5 hours, which would cover your needs.`,
        potentialSavings: 100,
        icon: '💰'
      });
    } else if (usagePercent > 85) {
      recommendations.push({
        type: 'optimize',
        severity: 'medium',
        service: 'claude',
        title: 'High Claude Usage Detected',
        description: `You're at ${usagePercent}% capacity. Consider optimizing prompts or upgrading if you hit limits frequently.`,
        icon: '⚠️'
      });
    }
  }

  // Check for underutilized services
  services.forEach(service => {
    const usagePercent = calculateUsagePercentage(service.usage.current, service.usage.max);

    if (usagePercent < 20 && service.id !== 'claude') {
      recommendations.push({
        type: 'cancel',
        severity: 'medium',
        service: service.id,
        title: `Low ${service.name} Usage`,
        description: `Only ${usagePercent}% utilized. Consider canceling to save $${service.monthlyCost}/month.`,
        potentialSavings: service.monthlyCost,
        icon: '🔍'
      });
    }
  });

  // Check for services nearing limits
  services.forEach(service => {
    const usagePercent = calculateUsagePercentage(service.usage.current, service.usage.max);

    if (usagePercent > 90) {
      recommendations.push({
        type: 'upgrade',
        severity: 'high',
        service: service.id,
        title: `${service.name} Near Limit`,
        description: `At ${usagePercent}% capacity (${service.usage.current}/${service.usage.max} ${service.usage.unit}). You may hit your limit soon.`,
        icon: '🚨'
      });
    }
  });

  // Sort by severity and potential savings
  return recommendations.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
    if (severityDiff !== 0) return severityDiff;

    return (b.potentialSavings || 0) - (a.potentialSavings || 0);
  });
}

export function calculateDashboardSummary(services: ServiceData[]): DashboardSummary {
  const totalMonthlySpend = services.reduce((sum, service) => sum + service.monthlyCost, 0);

  const totalUsage = services.reduce((sum, service) => {
    return sum + calculateUsagePercentage(service.usage.current, service.usage.max);
  }, 0);
  const totalUsagePercentage = Math.round(totalUsage / services.length);

  const recommendations = generateRecommendations(services);

  const totalSavings = recommendations
    .filter(r => r.type === 'downgrade' || r.type === 'cancel')
    .reduce((sum, r) => sum + (r.potentialSavings || 0), 0);

  const projectedSpend = totalMonthlySpend - totalSavings;

  return {
    totalMonthlySpend,
    totalUsagePercentage,
    recommendations,
    projectedSpend
  };
}
