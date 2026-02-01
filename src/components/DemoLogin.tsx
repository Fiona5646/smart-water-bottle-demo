import { useState } from 'react';

type KidneyStoneType = 'calcium-oxalate' | 'calcium-phosphate' | 'uric-acid' | 'other' | null;

interface DemoLoginProps {
  medicalHistory: string;
  onMedicalHistoryChange: (s: string) => void;
  kidneyStoneType: KidneyStoneType;
  onKidneyStoneTypeChange: (t: KidneyStoneType) => void;
}

export function DemoLogin({ medicalHistory, onMedicalHistoryChange, kidneyStoneType, onKidneyStoneTypeChange }: DemoLoginProps) {
  const [name, setName] = useState('');

  const stoneTypes: { id: KidneyStoneType; name: string; emoji: string }[] = [
    { id: 'calcium-oxalate', name: 'Calcium Oxalate', emoji: '🟡' },
    { id: 'calcium-phosphate', name: 'Calcium Phosphate', emoji: '⚪' },
    { id: 'uric-acid', name: 'Uric Acid', emoji: '🔴' },
    { id: 'other', name: 'Other / Unknown', emoji: '❓' },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 pb-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Demo Login & Medical Profile</h2>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
        <label className="text-sm font-medium text-gray-700">Name (demo)</label>
        <input
          className="w-full mt-2 p-2 border rounded-lg text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
        <label className="text-sm font-medium text-gray-700">Medical History</label>
        <textarea
          className="w-full mt-2 p-2 border rounded-lg text-sm min-h-[100px]"
          value={medicalHistory}
          onChange={(e) => onMedicalHistoryChange(e.target.value)}
          placeholder="Enter conditions, allergies, surgeries, notes..."
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Kidney Stone Type</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Select the type that best matches your history (for demo personalization)</p>
          <div className="grid grid-cols-1 gap-2">
            {stoneTypes.map((stone) => (
              <button
                key={stone.id}
                onClick={() => onKidneyStoneTypeChange(stone.id)}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  kidneyStoneType === stone.id
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{stone.emoji}</span>
                <span className={`font-medium text-sm ${
                  kidneyStoneType === stone.id ? 'text-blue-900' : 'text-gray-700'
                }`}>
                  {stone.name}
                </span>
                {kidneyStoneType === stone.id && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => alert('Demo profile saved locally in the app state.')}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          Save Profile
        </button>
        <button
          onClick={() => { setName(''); onMedicalHistoryChange(''); onKidneyStoneTypeChange(null); }}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
