import { Activity, Droplet, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface DrinkingHistoryProps {
  drinkingLog: Array<{ time: Date; volume: number }>;
  minDailyGoal: number;
  maxDailyGoal: number;
}

export function DrinkingHistory({ drinkingLog, minDailyGoal, maxDailyGoal }: DrinkingHistoryProps) {
  // Calculate statistics
  const totalVolume = drinkingLog.reduce((sum, record) => sum + record.volume, 0);
  const avgVolume = drinkingLog.length > 0 ? Math.round(totalVolume / drinkingLog.length) : 0;
  
  // Calculate intervals between drinks
  const intervals: number[] = [];
  for (let i = 0; i < drinkingLog.length - 1; i++) {
    const diff = (drinkingLog[i].time.getTime() - drinkingLog[i + 1].time.getTime()) / (1000 * 60);
    intervals.push(Math.round(diff));
  }
  
  const avgInterval = intervals.length > 0 
    ? Math.round(intervals.reduce((sum, val) => sum + val, 0) / intervals.length) 
    : 0;

  // Find min and max
  const volumes = drinkingLog.map(r => r.volume);
  const minVolume = volumes.length > 0 ? Math.min(...volumes) : 0;
  const maxVolume = volumes.length > 0 ? Math.max(...volumes) : 0;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Build hourly aggregation for the last 12 hours
  const buildHourlyData = () => {
    const now = new Date();
    const hours = Array.from({ length: 12 }).map((_, i) => {
      const d = new Date(now.getTime() - (11 - i) * 60 * 60 * 1000);
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), 0, 0, 0);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      const label = `${start.getHours().toString().padStart(2, '0')}:00`;
      const volume = drinkingLog
        .filter(r => r.time >= start && r.time < end)
        .reduce((sum, r) => sum + r.volume, 0);
      return { hour: label, volume };
    });
    return hours;
  };

  const hourlyData = buildHourlyData();

  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Drinking History</h2>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="text-xs text-gray-600 mb-1">Avg per Drink</div>
          <div className="text-lg font-bold text-blue-600">{avgVolume}ml</div>
        </div>
        <div className="bg-green-50 rounded-lg p-2">
          <div className="text-xs text-gray-600 mb-1">Max Single</div>
          <div className="text-lg font-bold text-green-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {maxVolume}ml
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-2">
          <div className="text-xs text-gray-600 mb-1">Min Single</div>
          <div className="text-lg font-bold text-orange-600 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            {minVolume}ml
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-2">
          <div className="text-xs text-gray-600 mb-1">Avg Interval</div>
          <div className="text-lg font-bold text-purple-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {avgInterval}min
          </div>
        </div>
      </div>

      {/* Hourly intake chart (last 12 hours) */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Intake per Hour (last 12 hours)</h3>
        <div style={{ width: '100%', height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => `${value} ml`} />
              <Bar dataKey="volume" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drinking log */}
      <div className="border-t pt-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Drinking Records</h3>
        <div className="space-y-2">
          {drinkingLog.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No drinking records yet
            </div>
          ) : (
            drinkingLog.map((record, index) => {
              const interval = index < drinkingLog.length - 1 
                ? Math.round((record.time.getTime() - drinkingLog[index + 1].time.getTime()) / (1000 * 60))
                : null;

              return (
                <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Droplet className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">
                          {record.volume}ml
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDateTime(record.time)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {interval !== null && (
                        <div className="text-xs text-gray-500">
                          {interval}min
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Daily summary */}
      {drinkingLog.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Today's Total</div>
                <div className="text-2xl font-bold text-blue-600">{totalVolume}ml</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Progress</div>
                <div className={`text-2xl font-bold ${
                  totalVolume >= minDailyGoal ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {Math.round((totalVolume / minDailyGoal) * 100)}%
                </div>
              </div>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Minimum Target:</span>
                <span className="font-semibold">{minDailyGoal}ml</span>
              </div>
              <div className="flex justify-between">
                <span>Maximum Limit:</span>
                <span className="font-semibold">{maxDailyGoal}ml</span>
              </div>
              {totalVolume >= maxDailyGoal && (
                <div className="text-orange-600 text-center mt-2 font-semibold">
                  ⚠️ Daily maximum reached
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}