import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UsageDataPoint } from '../lib/types';

interface UsageChartProps {
  data: UsageDataPoint[];
}

export default function UsageChart({ data }: UsageChartProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">📈 30-Day Usage Trends</h2>
        <p className="text-sm text-base-content/60 mb-4">
          Daily usage percentage across all services
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis tick={{ fontSize: 12 }} label={{ value: 'Usage %', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString();
              }}
              formatter={(value: number) => [`${value}%`, '']}
            />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Line
              type="monotone"
              dataKey="claude"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Claude"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cursor"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Cursor"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="gemini"
              stroke="#10b981"
              strokeWidth={2}
              name="Gemini"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="openai"
              stroke="#f59e0b"
              strokeWidth={2}
              name="OpenAI"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Trend Insights */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-title text-xs">Claude Trend</div>
            <div className="stat-value text-lg text-purple-500">↗</div>
            <div className="stat-desc text-xs">+5% vs last week</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-title text-xs">Cursor Trend</div>
            <div className="stat-value text-lg text-blue-500">→</div>
            <div className="stat-desc text-xs">Stable</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-title text-xs">Gemini Trend</div>
            <div className="stat-value text-lg text-green-500">↘</div>
            <div className="stat-desc text-xs">-2% vs last week</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-title text-xs">OpenAI Trend</div>
            <div className="stat-value text-lg text-orange-500">↗</div>
            <div className="stat-desc text-xs">+3% vs last week</div>
          </div>
        </div>
      </div>
    </div>
  );
}
