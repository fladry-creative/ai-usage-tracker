import { useState } from 'react';
import ServiceCard from './ServiceCard';
import SummaryCard from './SummaryCard';
import UsageChart from './UsageChart';
import { servicesData, usageTrendData } from '../lib/demoData';
import { calculateDashboardSummary } from '../lib/usageCalculator';

export default function Dashboard() {
  const [services] = useState(servicesData);
  const [trendData] = useState(usageTrendData);
  const summary = calculateDashboardSummary(services);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <span className="text-2xl">🎯</span>
            AI Usage Tracker
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <span className="text-xl">⚙️</span>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Configure API Keys</a>
              </li>
              <li>
                <a>Export Data</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 space-y-6">
        {/* Summary Section */}
        <div className="grid grid-cols-1 gap-6">
          <SummaryCard summary={summary} />
        </div>

        {/* Usage Chart */}
        <div className="grid grid-cols-1 gap-6">
          <UsageChart data={trendData} />
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Footer Info */}
        <div className="alert alert-info shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">How to enable real tracking</h3>
            <div className="text-xs">
              Currently using demo data. Configure API keys in settings to track real usage from:
              Claude Usage API, OpenAI Usage API, Google AI Studio, and Cursor dashboard.
            </div>
          </div>
          <button className="btn btn-sm btn-primary">Configure</button>
        </div>
      </div>
    </div>
  );
}
