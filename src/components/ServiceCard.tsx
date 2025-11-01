import type { ServiceData } from '../lib/types';
import { calculateUsagePercentage, getProgressBarColor } from '../lib/usageCalculator';

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const usagePercent = calculateUsagePercentage(service.usage.current, service.usage.max);
  const progressColor = getProgressBarColor(usagePercent);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{service.icon}</span>
            <div>
              <h2 className="card-title">{service.name}</h2>
              <p className="text-sm text-base-content/60">{service.currentPlan}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${service.monthlyCost}</div>
            <div className="text-xs text-base-content/60">per month</div>
          </div>
        </div>

        {/* Main Usage */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Usage</span>
            <span className="font-semibold">
              {service.usage.current.toLocaleString()} / {service.usage.max.toLocaleString()} {service.usage.unit}
            </span>
          </div>
          <div className="w-full">
            <progress
              className={`progress progress-${progressColor} w-full`}
              value={usagePercent}
              max="100"
            ></progress>
          </div>
          <div className="flex justify-between text-xs text-base-content/60 mt-1">
            <span>{usagePercent}% used</span>
            <span>Resets: {service.usage.resetPeriod}</span>
          </div>
        </div>

        {/* Model Usage Breakdown */}
        {service.modelUsage && service.modelUsage.length > 0 && (
          <div className="mt-4 space-y-3">
            <div className="text-sm font-semibold text-base-content/80">Model Usage</div>
            {service.modelUsage.map((model, idx) => {
              const modelPercent = calculateUsagePercentage(model.current, model.max);
              const modelColor = getProgressBarColor(modelPercent);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-base-content/70">{model.name}</span>
                    <span className="font-medium">
                      {model.current.toLocaleString()} / {model.max.toLocaleString()} {model.unit}
                    </span>
                  </div>
                  <progress
                    className={`progress progress-${modelColor} w-full h-2`}
                    value={modelPercent}
                    max="100"
                  ></progress>
                </div>
              );
            })}
          </div>
        )}

        {/* Features */}
        <div className="mt-4">
          <div className="text-sm font-semibold text-base-content/80 mb-2">Features</div>
          <ul className="space-y-1">
            {service.features.map((feature, idx) => (
              <li key={idx} className="text-xs text-base-content/70 flex items-start">
                <span className="mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tracking Method Badge */}
        <div className="mt-4">
          <div className="badge badge-sm badge-outline">
            {service.trackingMethod === 'api' && '🔌 API Tracking'}
            {service.trackingMethod === 'dashboard' && '📊 Dashboard Tracking'}
            {service.trackingMethod === 'manual' && '✋ Manual Tracking'}
          </div>
        </div>
      </div>
    </div>
  );
}
