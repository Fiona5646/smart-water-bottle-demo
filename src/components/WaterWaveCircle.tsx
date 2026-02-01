interface WaterWaveCircleProps {
  percentage: number;
  size?: number;
  label: string;
  value: string;
  target: string;
}

export function WaterWaveCircle({ 
  percentage, 
  size = 180, 
  label,
  value,
  target 
}: WaterWaveCircleProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const waterHeight = clampedPercentage;
  
  // Generate wave path
  const waveOffset = Date.now() / 1000; // Animate based on time
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* Water with wave effect */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
            </linearGradient>
            
            {/* Wave animation */}
            <path
              id="wave"
              d={`M 0 ${50 - waterHeight / 2} 
                  Q 12.5 ${45 - waterHeight / 2} 25 ${50 - waterHeight / 2} 
                  T 50 ${50 - waterHeight / 2} 
                  T 75 ${50 - waterHeight / 2} 
                  T 100 ${50 - waterHeight / 2} 
                  V 100 H 0 Z`}
              fill="url(#waterGradient)"
            >
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values={`
                  M 0 ${50 - waterHeight / 2} 
                  Q 12.5 ${45 - waterHeight / 2} 25 ${50 - waterHeight / 2} 
                  T 50 ${50 - waterHeight / 2} 
                  T 75 ${50 - waterHeight / 2} 
                  T 100 ${50 - waterHeight / 2} 
                  V 100 H 0 Z;
                  
                  M 0 ${50 - waterHeight / 2} 
                  Q 12.5 ${55 - waterHeight / 2} 25 ${50 - waterHeight / 2} 
                  T 50 ${50 - waterHeight / 2} 
                  T 75 ${50 - waterHeight / 2} 
                  T 100 ${50 - waterHeight / 2} 
                  V 100 H 0 Z;
                  
                  M 0 ${50 - waterHeight / 2} 
                  Q 12.5 ${45 - waterHeight / 2} 25 ${50 - waterHeight / 2} 
                  T 50 ${50 - waterHeight / 2} 
                  T 75 ${50 - waterHeight / 2} 
                  T 100 ${50 - waterHeight / 2} 
                  V 100 H 0 Z
                `}
              />
            </path>
          </defs>
          
          <use href="#wave" />
        </svg>
        
        {/* Border circle */}
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500" />
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800">
          <div className="text-4xl font-bold text-cyan-700 drop-shadow-sm">
            {Math.round(clampedPercentage)}%
          </div>
          <div className="text-xs text-gray-600 mt-1 font-medium drop-shadow-sm">
            {value}
          </div>
        </div>
      </div>
      
      {/* Label */}
      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-gray-700">{label}</div>
        <div className="text-xs text-gray-500">{target}</div>
      </div>
    </div>
  );
}
