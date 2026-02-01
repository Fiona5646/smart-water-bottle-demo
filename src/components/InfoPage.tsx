import { Info, Droplet, Apple, AlertTriangle } from 'lucide-react';

type KidneyStoneType = 'calcium-oxalate' | 'calcium-phosphate' | 'uric-acid' | 'other' | null;

interface InfoPageProps {
  kidneyStoneType: KidneyStoneType;
  onKidneyStoneTypeChange: (type: KidneyStoneType) => void;
}

export function InfoPage({ kidneyStoneType, onKidneyStoneTypeChange }: InfoPageProps) {
  const urineColors = [
    { color: 'bg-yellow-50', label: 'Clear/Pale', status: 'Well Hydrated', description: 'Optimal hydration level' },
    { color: 'bg-yellow-100', label: 'Light Yellow', status: 'Well Hydrated', description: 'Good hydration' },
    { color: 'bg-yellow-200', label: 'Yellow', status: 'Normal', description: 'Normal hydration' },
    { color: 'bg-yellow-300', label: 'Dark Yellow', status: 'Mild Dehydration', description: 'Drink water soon' },
    { color: 'bg-orange-400', label: 'Amber', status: 'Dehydrated', description: 'Drink water now' },
    { color: 'bg-orange-600', label: 'Dark Orange', status: 'Severe Dehydration', description: 'Drink water immediately' },
  ];

  const stoneTypes = [
    { id: 'calcium-oxalate' as KidneyStoneType, name: 'Calcium Oxalate', emoji: '🟡' },
    { id: 'calcium-phosphate' as KidneyStoneType, name: 'Calcium Phosphate', emoji: '⚪' },
    { id: 'uric-acid' as KidneyStoneType, name: 'Uric Acid', emoji: '🔴' },
    { id: 'other' as KidneyStoneType, name: 'Other/Unknown', emoji: '❓' },
  ];

  const getKidneyStoneRecommendations = (type: KidneyStoneType) => {
    switch (type) {
      case 'uric-acid':
        return {
          primaryGoal: 'Reduce urine acidity & increase urine production',
          keyRecommendation: 'Alkalize urine (milk, vegetables, citrate), Limit purines',
          avoid: [
            { item: 'Red meat', icon: '🥩' },
            { item: 'Organ meats (liver, kidneys)', icon: '🫀' },
            { item: 'Shellfish', icon: '🦐' },
            { item: 'Beer', icon: '🍺' },
            { item: 'High purine foods', icon: '⚠️' },
          ],
          increase: [
            { item: 'Water intake', icon: '💧', water: 'Essential' },
            { item: 'Citrus fruits', icon: '🍊', water: '87%' },
            { item: 'Vegetables', icon: '🥬', water: '90-96%' },
            { item: 'Low-fat dairy', icon: '🥛', water: '85-90%' },
            { item: 'Watermelon', icon: '🍉', water: '92%' },
            { item: 'Cucumber', icon: '🥒', water: '96%' },
          ],
          note: 'Increase fluids',
        };
      case 'calcium-phosphate':
        return {
          primaryGoal: 'Reduce urine alkalinity (pH)',
          keyRecommendation: 'Acidify urine (cranberry juice, lemon juice)',
          avoid: [
            { item: 'High sodium foods', icon: '🧂' },
            { item: 'Excessive alkali medications', icon: '💊' },
            { item: 'Too much animal protein', icon: '🥩' },
            { item: 'Processed foods', icon: '🍟' },
          ],
          increase: [
            { item: 'Cranberry juice', icon: '🧃', water: '90%' },
            { item: 'Lemon juice (in water)', icon: '🍋', water: '89%' },
            { item: 'Oranges', icon: '🍊', water: '87%' },
            { item: 'Strawberries', icon: '🍓', water: '91%' },
            { item: 'Celery', icon: '🥬', water: '95%' },
            { item: 'Moderate fluids', icon: '💧', water: 'Moderate' },
          ],
          note: 'Not high Calcium, moderate fluids',
        };
      case 'calcium-oxalate':
        return {
          primaryGoal: 'Reduce urine oxalate & prevent calcium crystallization',
          keyRecommendation: 'Adequate Calcium (1,000-1,200 mg/day), Moderate Oxalate intake',
          avoid: [
            { item: 'Spinach', icon: '🥬' },
            { item: 'Nuts', icon: '🥜' },
            { item: 'Chocolate', icon: '🍫' },
            { item: 'Excessive vitamin C supplements', icon: '💊' },
            { item: 'High oxalate foods', icon: '⚠️' },
          ],
          increase: [
            { item: 'Calcium-rich foods (dairy)', icon: '🥛', water: '87%' },
            { item: 'Water intake', icon: '💧', water: 'Essential' },
            { item: 'Citrus fruits', icon: '🍊', water: '87%' },
            { item: 'Watermelon', icon: '🍉', water: '92%' },
            { item: 'Cucumber', icon: '🥒', water: '96%' },
            { item: 'Lettuce', icon: '🥗', water: '96%' },
          ],
          note: 'Moderate fluids',
        };
      case 'other':
        return {
          primaryGoal: 'Maintain adequate hydration',
          keyRecommendation: 'Focus on general hydration and balanced diet',
          avoid: [
            { item: 'Dehydration', icon: '⚠️' },
            { item: 'Excessive sodium', icon: '🧂' },
            { item: 'High sugar drinks', icon: '🥤' },
            { item: 'Processed foods', icon: '🍟' },
          ],
          increase: [
            { item: 'Water throughout the day', icon: '💧', water: 'Essential' },
            { item: 'Watermelon', icon: '🍉', water: '92%' },
            { item: 'Cucumber', icon: '🥒', water: '96%' },
            { item: 'Strawberries', icon: '🍓', water: '91%' },
            { item: 'Celery', icon: '🥬', water: '95%' },
            { item: 'Oranges', icon: '🍊', water: '87%' },
            { item: 'Lettuce', icon: '🥗', water: '96%' },
          ],
          note: 'Consult healthcare provider for specific recommendations',
        };
      default:
        return null;
    }
  };

  const recommendations = getKidneyStoneRecommendations(kidneyStoneType);

  return (
    <div className="h-full overflow-y-auto p-4 pb-20">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Health Info</h2>
      </div>

      {/* Kidney Stone Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Kidney Stone Type</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Select your kidney stone type for personalized dietary recommendations:
          </p>
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

      {/* Dietary Recommendations & Hydrating Foods (Merged) */}
      {recommendations && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Dietary Recommendations</h3>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 shadow-sm border border-blue-200">
            {/* Primary Goal */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-blue-900 mb-1">PRIMARY GOAL</div>
              <div className="text-sm text-blue-800">{recommendations.primaryGoal}</div>
            </div>

            {/* Key Recommendation */}
            <div className="mb-4 bg-white bg-opacity-60 rounded-lg p-3">
              <div className="text-xs font-semibold text-blue-900 mb-1">KEY RECOMMENDATION</div>
              <div className="text-sm text-blue-800">{recommendations.keyRecommendation}</div>
            </div>

            {/* Avoid */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <div className="text-xs font-semibold text-red-900">AVOID</div>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {recommendations.avoid.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-red-800 bg-red-50 rounded-lg p-2 border border-red-200">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="flex-1">{item.item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Increase - Foods with Water Content */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Apple className="w-4 h-4 text-green-600" />
                <div className="text-xs font-semibold text-green-900">INCREASE (Hydrating Foods)</div>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {recommendations.increase.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-green-800 bg-green-50 rounded-lg p-2 border border-green-200">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="flex-1">{item.item}</span>
                    {item.water && (
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.water}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <div className="text-xs font-semibold text-yellow-900 mb-1">NOTE</div>
              <div className="text-sm text-yellow-800">{recommendations.note}</div>
            </div>
          </div>
        </div>
      )}

      {/* Urine Color Chart */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Droplet className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Urine Color Hydration Chart</h3>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-yellow-50 border-2 border-yellow-300 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-semibold text-yellow-900">Target: </span>
                <span className="text-yellow-800">Pale/Light Yellow indicates optimal hydration</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Monitor your hydration status by urine color:
          </p>
          <div className="space-y-2">
            {urineColors.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className={`w-8 h-8 rounded-full ${item.color} border-2 border-gray-300 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-gray-800">{item.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.status.includes('Well') || item.status === 'Normal' 
                        ? 'bg-green-100 text-green-700' 
                        : item.status.includes('Severe')
                        ? 'bg-red-100 text-red-700'
                        : item.status.includes('Dehydration')
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* General Tips */}
      <div className="mb-6">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-semibold text-sm text-blue-900 mb-2">💡 Hydration Tips</h4>
          <ul className="space-y-1.5 text-xs text-blue-800">
            <li>• Drink water before you feel thirsty</li>
            <li>• Warm water (not cold) helps with better absorption and digestion</li>
            <li>• Increase water intake during exercise or hot weather</li>
            <li>• Balance electrolytes when drinking large amounts</li>
            <li>• Avoid drinking too much water too quickly</li>
            <li>• Morning hydration helps kickstart your metabolism</li>
            <li>• Maintain pale/light yellow urine color for optimal hydration</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6">
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <h4 className="font-semibold text-sm text-orange-900 mb-2">⚠️ Medical Disclaimer</h4>
          <p className="text-xs text-orange-800">
            These recommendations are for informational purposes only. Always consult with your healthcare provider 
            or registered dietitian for personalized medical advice and treatment plans, especially for kidney stone management.
          </p>
        </div>
      </div>
    </div>
  );
}
