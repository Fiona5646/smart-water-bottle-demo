import { Droplet, LayoutDashboard, History, Bell, Info } from 'lucide-react';

type Screen = 'bottle' | 'dashboard' | 'history' | 'reminders' | 'info';

interface BottomNavProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export function BottomNav({ activeScreen, onScreenChange }: BottomNavProps) {
  const navItems = [
    { id: 'bottle' as Screen, icon: Droplet, label: 'Bottle' },
    { id: 'dashboard' as Screen, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'history' as Screen, icon: History, label: 'History' },
    { id: 'reminders' as Screen, icon: Bell, label: 'Reminders' },
    { id: 'info' as Screen, icon: Info, label: 'Info' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-2 safe-area-bottom">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />
              <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}