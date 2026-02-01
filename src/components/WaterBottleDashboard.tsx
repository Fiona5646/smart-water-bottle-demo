import { Droplet, TrendingUp, Clock, Battery, Thermometer } from 'lucide-react';
import { WaterWaveCircle } from './WaterWaveCircle';

interface WaterBottleDashboardProps {
  bottleVolume: number;
  bottleCapacity: number;
  minDailyGoal: number;
  maxDailyGoal: number;
  dailyConsumed: number;
  lastDrinkTime: Date;
  waterTemperature: number;
  alertActive: boolean;
  onSimulateDrink: (volume: number) => void;
  onRefill: () => void;
  onMinDailyGoalChange: (goal: number) => void;
  onMaxDailyGoalChange: (goal: number) => void;
  hydrationFrequencyMinutes?: number;
  onHydrationFrequencyChange?: (m: number) => void;
}

export function WaterBottleDashboard({
  bottleVolume,
  bottleCapacity,
  minDailyGoal,
  maxDailyGoal,
  dailyConsumed,
  lastDrinkTime,
  waterTemperature,
  alertActive,
  onSimulateDrink,
  onRefill,
  onMinDailyGoalChange,
  onMaxDailyGoalChange,
  hydrationFrequencyMinutes,
  onHydrationFrequencyChange,
}: WaterBottleDashboardProps) {
  const minDailyProgress = (dailyConsumed / minDailyGoal) * 100;
  const maxDailyProgress = (dailyConsumed / maxDailyGoal) * 100;
  const minutesSinceLastDrink = Math.floor((Date.now() - lastDrinkTime.getTime()) / 60000);
  const percent = Math.round((bottleVolume / bottleCapacity) * 100);
  const fillGradient = percent >= 60 ? 'from-green-400 to-green-600' : percent >= 20 ? 'from-yellow-400 to-orange-400' : 'from-red-500 to-red-600';
  const iconColorClass = percent >= 60 ? 'text-green-600' : percent >= 20 ? 'text-orange-500' : 'text-red-600';
  const tipClass = percent > 0 ? (percent >= 60 ? 'bg-green-600' : percent >= 20 ? 'bg-orange-400' : 'bg-red-600') : 'bg-gray-300';
  const borderClass = percent >= 60 ? 'border-transparent' : 'border-gray-300';
  const percentTextClass = percent === 60 ? 'text-black' : percent > 60 ? 'text-white' : 'text-gray-800';

  // Temperature display helpers
  const temp = (waterTemperature ?? 22);
  const tempLabel = temp >= 35 ? 'Hot' : temp >= 20 ? 'Warm' : temp >= 10 ? 'Cool' : 'Cold';
  const tempColor = temp >= 35 ? 'text-red-600' : temp >= 20 ? 'text-orange-500' : temp >= 10 ? 'text-cyan-600' : 'text-blue-600';
  const tempBgClass = temp >= 35 ? 'bg-red-50 border border-red-200' : temp >= 20 ? 'bg-orange-50 border border-orange-200' : temp >= 10 ? 'bg-cyan-50 border border-cyan-200' : 'bg-blue-50 border border-blue-200';

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h2>
      
      {/* Bluetooth Connection Status (with compact battery display) */}
      <div className="mb-4 bg-blue-50 rounded-xl p-3 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm text-blue-700">Bottle connected via Bluetooth</span>
          </div>

          {/* Compact battery-style indicator using bottle volume as proxy */}
          <div className="flex items-center gap-3">
            <Battery className={`w-5 h-5 ${iconColorClass}`} />
            <div className={`relative w-20 h-6 bg-transparent ${borderClass} rounded-lg flex items-center px-1`}>
              {/* tip */}
              <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-3 rounded-r ${tipClass}`} />
              <div className="w-full h-full rounded overflow-hidden bg-transparent">
                <div
                  className={`h-full bg-gradient-to-r ${fillGradient} transition-all`}
                  style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className={`text-xs font-semibold ${percentTextClass}`}>
                  {percent}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-1">Water data synced automatically</p>
      </div>

      {/* Circular Water Wave Visualization */}
      <div className="mb-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Today's Hydration</h3>
        <div className="flex justify-center">
          <WaterWaveCircle
            percentage={percent}
            size={200}
            label="Minimum Target Progress"
            value={`${dailyConsumed}ml / ${minDailyGoal}ml`}
            target={`Max limit: ${maxDailyGoal}ml`}
          />
        </div>
        
        {/* Status messages */}
        <div className="mt-4 space-y-2">
          {dailyConsumed >= maxDailyGoal && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <span className="text-sm font-semibold text-red-700">⚠️ Daily maximum reached!</span>
              <p className="text-xs text-red-600 mt-1">You've reached your maximum daily limit</p>
            </div>
          )}
          {dailyConsumed >= minDailyGoal && dailyConsumed < maxDailyGoal && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <span className="text-sm font-semibold text-green-700">✓ Minimum goal achieved!</span>
              <p className="text-xs text-green-600 mt-1">Great job staying hydrated</p>
            </div>
          )}
          {dailyConsumed < minDailyGoal && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <span className="text-sm font-semibold text-orange-700">Keep going!</span>
              <p className="text-xs text-orange-600 mt-1">{minDailyGoal - dailyConsumed}ml to minimum goal</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Current Bottle Volume (Progress bar) */}
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-600">Current Bottle Volume</span>
          </div>
          <div className="text-xl font-bold text-blue-600">{bottleVolume}ml</div>
          <div className="text-xs text-gray-500">/ {bottleCapacity}ml</div>

          <div className="mt-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-3 bg-white rounded-full overflow-hidden border border-gray-200">
                  <div
                      className={`h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500`}
                      style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                    />
                </div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-700 text-right">{percent}%</div>
            </div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="bg-green-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-600">Today's Total</span>
          </div>
          <div className="text-xl font-bold text-green-600">{dailyConsumed}ml</div>
          <div className="text-xs text-gray-500">Min: {minDailyGoal}ml</div>
        </div>

        {/* Time Since Last Drink (left of Water Temp) */}
        <div className={`${alertActive ? 'bg-red-50' : 'bg-purple-50'} rounded-xl p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`w-4 h-4 ${alertActive ? 'text-red-600' : 'text-purple-600'}`} />
            <span className="text-xs text-gray-600">Last Drink</span>
          </div>
          <div className={`text-xl font-bold ${alertActive ? 'text-red-600' : 'text-purple-600'}`}>
            {minutesSinceLastDrink} minutes ago
          </div>
          {alertActive && <div className="text-xs text-red-600 mt-1">⚠️ Time to hydrate!</div>}
        </div>

        {/* Temperature Card (to the right of Last Drink) */}
        <div className={`rounded-xl p-3 ${tempBgClass}`}>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className={`w-4 h-4 ${tempColor}`} />
            <span className="text-xs text-gray-600">Water Temp</span>
          </div>
          <div className="text-2xl font-bold">
            <span className={`${tempColor}`}>{temp}°C</span>
          </div>
          <div className="text-xs text-gray-500">{tempLabel}</div>
        </div>
      </div>

      {/* Hydration Goal Settings */}
      <div className="mb-4 bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Hydration Goal Settings</h3>
        
        {/* Minimum Goal */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Minimum Target
            </label>
            <span className="text-sm font-bold text-cyan-600">{minDailyGoal}ml</span>
          </div>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={minDailyGoal}
            onChange={(e) => {
              const newMin = Number(e.target.value);
              if (newMin < maxDailyGoal) {
                onMinDailyGoalChange(newMin);
              }
            }}
            className="w-full h-2 bg-cyan-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>500ml</span>
            <span>5000ml</span>
          </div>
        </div>

        {/* Maximum Goal */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Maximum Limit
            </label>
            <span className="text-sm font-bold text-orange-600">{maxDailyGoal}ml</span>
          </div>
          <input
            type="range"
            min="1000"
            max="6000"
            step="100"
            value={maxDailyGoal}
            onChange={(e) => {
              const newMax = Number(e.target.value);
              if (newMax > minDailyGoal) {
                onMaxDailyGoalChange(newMax);
              }
            }}
            className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1000ml</span>
            <span>6000ml</span>
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
          <strong>Note:</strong> Maximum limit prevents excessive water intake. Daily consumption cannot exceed this amount.
        </div>
      </div>

      {/* Hydration Frequency Setting */}
      <div className="mb-4 bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Hydration Reminder Frequency</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={5}
            max={240}
            value={hydrationFrequencyMinutes ?? 30}
            onChange={(e) => onHydrationFrequencyChange && onHydrationFrequencyChange(Number(e.target.value))}
            className="w-24 px-3 py-2 border rounded-lg text-sm"
          />
          <div className="text-sm text-gray-600">minutes since last drink to trigger reminder</div>
        </div>
      </div>

      {/* Control Panel - For testing/demo purposes */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Demo Controls</h3>
        <p className="text-xs text-gray-500 mb-3">
          (For testing - Real data comes from Bluetooth bottle)
        </p>
        
        {/* Drink Simulation Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => onSimulateDrink(50)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={bottleVolume < 50 || dailyConsumed >= maxDailyGoal}
          >
            Drink 50ml
          </button>
          <button
            onClick={() => onSimulateDrink(100)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={bottleVolume < 100 || dailyConsumed >= maxDailyGoal}
          >
            Drink 100ml
          </button>
          <button
            onClick={() => onSimulateDrink(200)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={bottleVolume < 200 || dailyConsumed >= maxDailyGoal}
          >
            Drink 200ml
          </button>
          <button
            onClick={onRefill}
            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            Refill
          </button>
        </div>
        
        {dailyConsumed >= maxDailyGoal && (
          <div className="text-xs text-orange-600 text-center mt-2">
            Demo controls disabled: Maximum daily limit reached
          </div>
        )}
      </div>
    </div>
  );
}
