import { Droplet, Bell } from 'lucide-react';

interface BottleScreenProps {
  bottleVolume: number;
  bottleCapacity: number;
  dailyConsumed: number;
  minDailyGoal: number;
  maxDailyGoal: number;
  alertActive: boolean;
  reminders: Array<{ id: string; text: string; time: string }>;
}

export function BottleScreen({
  bottleVolume,
  bottleCapacity,
  dailyConsumed,
  minDailyGoal,
  maxDailyGoal,
  alertActive,
  reminders,
}: BottleScreenProps) {
  const waterPercentage = (bottleVolume / bottleCapacity) * 100;
  const dailyPercentageMin = (dailyConsumed / minDailyGoal) * 100;
  const dailyPercentageMax = (dailyConsumed / maxDailyGoal) * 100;

  const getWaterColor = () => {
    if (waterPercentage > 50) return 'from-cyan-400 to-blue-500';
    if (waterPercentage > 20) return 'from-orange-400 to-yellow-500';
    return 'from-red-400 to-orange-500';
  };

  return (
    <div className="h-full bg-gray-900 p-6 text-white relative overflow-hidden">
      {/* Alert glow effect */}
      {alertActive && (
        <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse pointer-events-none" />
      )}
      
      {/* Top bar - Time */}
      <div className="flex justify-end items-center mb-6">
        <div className="text-xs text-gray-400">
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Daily goal progress - LARGER and FIRST */}
      <div className="mb-6 bg-gray-800 rounded-xl p-5">
        <div className="text-sm text-gray-400 mb-3">Today's Hydration</div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-3xl font-bold">{dailyConsumed}ml</span>
          <div className="text-right">
            <div className="text-xs text-gray-400">Min: {minDailyGoal}ml</div>
            <div className="text-xs text-gray-400">Max: {maxDailyGoal}ml</div>
          </div>
        </div>
        
        {/* Min Goal Progress */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Minimum Target</span>
            <span className="text-xs text-cyan-400">{Math.round(dailyPercentageMin)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(dailyPercentageMin, 100)}%` }}
            />
          </div>
        </div>
        
        {/* Max Goal Progress */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Maximum Limit</span>
            <span className="text-xs text-orange-400">{Math.round(dailyPercentageMax)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                dailyPercentageMax >= 100 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-yellow-400 to-orange-400'
              }`}
              style={{ width: `${Math.min(dailyPercentageMax, 100)}%` }}
            />
          </div>
        </div>
        
        {dailyConsumed >= maxDailyGoal && (
          <div className="mt-2 text-xs text-orange-400 text-center">
            ⚠️ Daily maximum reached
          </div>
        )}
      </div>

      {/* Water level indicator - Battery style - SMALLER */}
      <div className="mb-6">
        <div className="text-center mb-3">
          <div className="text-xs text-gray-400 mb-1">Current Bottle Volume</div>
          <div className="text-2xl font-bold">{bottleVolume}ml</div>
          <div className="text-xs text-gray-500">Capacity: {bottleCapacity}ml</div>
        </div>
        
        {/* Battery-style water indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-48 h-24 border-3 border-white rounded-lg">
            {/* Battery tip */}
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-r" />
            
            {/* Water fill */}
            <div className="absolute inset-1 bg-gray-800 rounded overflow-hidden">
              <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getWaterColor()} transition-all duration-500`}
                style={{ height: `${waterPercentage}%` }}
              />
            </div>
            
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold z-10 drop-shadow-lg">
                {Math.round(waterPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reminders section */}
      {reminders.length > 0 && (
        <div className="border-t border-gray-700 pt-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Reminders</span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {reminders.slice(0, 3).map((reminder) => (
              <div
                key={reminder.id}
                className="bg-gray-800 rounded p-3 text-sm flex items-center justify-between"
              >
                <span className="truncate flex-1">{reminder.text}</span>
                <span className="text-cyan-400 ml-2 text-xs">{reminder.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alert indicator */}
      {alertActive && (
        <div className="mt-4 bg-red-600 rounded-lg p-4 text-center animate-pulse">
          <Bell className="w-6 h-6 mx-auto mb-1" />
          <div className="font-bold">Time to Drink Water!</div>
          <div className="text-xs mt-1">30+ minutes since last drink</div>
        </div>
      )}
    </div>
  );
}