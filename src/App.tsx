import { useState, useEffect } from 'react';
import { WaterBottleDashboard } from './components/WaterBottleDashboard';
import { BottleScreen } from './components/BottleScreen';
import { ReminderManager } from './components/ReminderManager';
import { DrinkingHistory } from './components/DrinkingHistory';
import { InfoPage } from './components/InfoPage';
import { BottomNav } from './components/BottomNav';

type Screen = 'bottle' | 'dashboard' | 'history' | 'reminders' | 'info';
type KidneyStoneType = 'calcium-oxalate' | 'calcium-phosphate' | 'uric-acid' | 'struvite' | 'other' | null;

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('bottle');
  const [bottleVolume, setBottleVolume] = useState(450); // ml - from Bluetooth
  const [bottleCapacity] = useState(750); // ml - fixed capacity
  const [minDailyGoal, setMinDailyGoal] = useState(2000); // ml - minimum target
  const [maxDailyGoal, setMaxDailyGoal] = useState(3500); // ml - maximum target
  const [dailyConsumed, setDailyConsumed] = useState(550); // ml
  const [lastDrinkTime, setLastDrinkTime] = useState<Date>(new Date());
  const [alertActive, setAlertActive] = useState(false);
  const [kidneyStoneType, setKidneyStoneType] = useState<KidneyStoneType>(null);

  const [reminders, setReminders] = useState<Array<{ id: string; text: string; time: string }>>([
    { id: '1', text: 'Morning medication', time: '08:00' },
    { id: '2', text: 'Afternoon vitamins', time: '14:00' },
  ]);

  const [drinkingLog, setDrinkingLog] = useState<Array<{ time: Date; volume: number }>>([
    { time: new Date(Date.now() - 3600000), volume: 200 },
    { time: new Date(Date.now() - 7200000), volume: 150 },
    { time: new Date(Date.now() - 10800000), volume: 200 },
  ]);

  // Check if too much time has passed without drinking (30 minutes)
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const minutesSinceLastDrink = Math.floor((Date.now() - lastDrinkTime.getTime()) / 60000);
      setAlertActive(minutesSinceLastDrink >= 30);
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, [lastDrinkTime]);

  // Simulate Bluetooth data updates
  const simulateDrink = (volume: number) => {
    if (bottleVolume >= volume && dailyConsumed + volume <= maxDailyGoal) {
      setBottleVolume(prev => prev - volume);
      setDailyConsumed(prev => prev + volume);
      setLastDrinkTime(new Date());
      setDrinkingLog(prev => [{ time: new Date(), volume }, ...prev]);
      setAlertActive(false);
    }
  };

  // Auto-detect refill when volume increases significantly
  const refillBottle = () => {
    setBottleVolume(bottleCapacity);
  };

  const addReminder = (text: string, time: string) => {
    const newReminder = {
      id: Date.now().toString(),
      text,
      time,
    };
    setReminders([...reminders, newReminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Phone Container */}
      <div className="w-full max-w-md h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative border-8 border-gray-800">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-50"></div>
        
        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto pt-8 pb-20">
          {activeScreen === 'bottle' && (
            <BottleScreen
              bottleVolume={bottleVolume}
              bottleCapacity={bottleCapacity}
              dailyConsumed={dailyConsumed}
              minDailyGoal={minDailyGoal}
              maxDailyGoal={maxDailyGoal}
              alertActive={alertActive}
              reminders={reminders}
            />
          )}
          
          {activeScreen === 'dashboard' && (
            <WaterBottleDashboard
              bottleVolume={bottleVolume}
              bottleCapacity={bottleCapacity}
              minDailyGoal={minDailyGoal}
              maxDailyGoal={maxDailyGoal}
              dailyConsumed={dailyConsumed}
              lastDrinkTime={lastDrinkTime}
              alertActive={alertActive}
              onSimulateDrink={simulateDrink}
              onRefill={refillBottle}
              onMinDailyGoalChange={setMinDailyGoal}
              onMaxDailyGoalChange={setMaxDailyGoal}
            />
          )}
          
          {activeScreen === 'history' && (
            <DrinkingHistory
              drinkingLog={drinkingLog}
              minDailyGoal={minDailyGoal}
              maxDailyGoal={maxDailyGoal}
            />
          )}
          
          {activeScreen === 'reminders' && (
            <ReminderManager
              reminders={reminders}
              onAddReminder={addReminder}
              onDeleteReminder={deleteReminder}
            />
          )}

          {activeScreen === 'info' && (
            <InfoPage
              kidneyStoneType={kidneyStoneType}
              onKidneyStoneTypeChange={setKidneyStoneType}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      </div>
    </div>
  );
}