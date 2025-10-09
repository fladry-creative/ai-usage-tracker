import { DashboardSummary } from '../lib/types';

interface SummaryCardProps {
  summary: DashboardSummary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  const potentialSavings = summary.totalMonthlySpend - summary.projectedSpend;

  return (
    <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl">💰 Spending Summary</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="stats shadow bg-base-100/20">
            <div className="stat p-4">
              <div className="stat-title text-primary-content/70 text-xs">Current Spend</div>
              <div className="stat-value text-primary-content text-2xl">
                ${summary.totalMonthlySpend}
              </div>
              <div className="stat-desc text-primary-content/60 text-xs">per month</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100/20">
            <div className="stat p-4">
              <div className="stat-title text-primary-content/70 text-xs">Avg Usage</div>
              <div className="stat-value text-primary-content text-2xl">
                {summary.totalUsagePercentage}%
              </div>
              <div className="stat-desc text-primary-content/60 text-xs">across services</div>
            </div>
          </div>
        </div>

        {/* Potential Savings */}
        {potentialSavings > 0 && (
          <div className="alert bg-success/20 border-success/40 text-success-content mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold">Save ${potentialSavings}/month!</h3>
              <div className="text-xs">
                Optimized spend: ${summary.projectedSpend}/month
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span>💡</span>
            <span>Smart Recommendations</span>
          </h3>

          {summary.recommendations.length === 0 ? (
            <div className="alert bg-base-100/20">
              <span>✅ Your usage is optimized! No changes recommended.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {summary.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`alert ${
                    rec.severity === 'high'
                      ? 'bg-error/20 border-error/40'
                      : rec.severity === 'medium'
                      ? 'bg-warning/20 border-warning/40'
                      : 'bg-info/20 border-info/40'
                  }`}
                >
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{rec.icon}</span>
                        <span className="font-semibold text-sm">{rec.title}</span>
                      </div>
                      {rec.potentialSavings && (
                        <div className="badge badge-success badge-sm">
                          -${rec.potentialSavings}/mo
                        </div>
                      )}
                    </div>
                    <p className="text-xs opacity-90 ml-8">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        {potentialSavings > 0 && (
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-accent btn-sm">
              Optimize Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
