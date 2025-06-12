import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Droplets, Zap, Fuel, Route, MapPin } from 'lucide-react';

interface InteractiveFuelEfficiencyProps {
  fuelEconomy: string; // e.g., "15/24 mpg"
  transmission: string;
  drivetrain: string;
  className?: string;
}

const InteractiveFuelEfficiency: React.FC<InteractiveFuelEfficiencyProps> = ({
  fuelEconomy,
  transmission,
  drivetrain,
  className = ""
}) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [mode, setMode] = useState<'city' | 'highway'>('city');
  const [fuelFlow, setFuelFlow] = useState(0);
  const [distance, setDistance] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Parse fuel economy (e.g., "15/24 mpg" -> city: 15, highway: 24)
  const fuelNumbers = fuelEconomy.match(/(\d+)\/(\d+)/);
  const cityMPG = parseInt(fuelNumbers?.[1] || "20");
  const highwayMPG = parseInt(fuelNumbers?.[2] || "30");
  
  const currentMPG = mode === 'city' ? cityMPG : highwayMPG;
  const maxMPG = 50; // Scale for visualization

  // Auto-demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        performEfficiencyDemo();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnimating, mode]);

  const performEfficiencyDemo = () => {
    setIsAnimating(true);
    setShowDetails(true);
    setDistance(0);

    // Simulate driving scenario
    const targetLevel = (currentMPG / maxMPG) * 100;
    const drivingDuration = 3000; // 3 seconds
    const steps = 60;

    // Start fuel flow animation
    intervalRef.current = setInterval(() => {
      setFuelFlow(prev => (prev + 1) % 100);
    }, 50);

    // Animate efficiency and distance
    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        const progress = i / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 2);

        setCurrentLevel(targetLevel * easeProgress);
        setDistance(progress * (mode === 'highway' ? 60 : 30)); // Miles driven

        if (i === steps) {
          setTimeout(() => {
            setIsAnimating(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTimeout(() => setShowDetails(false), 2000);
          }, 500);
        }
      }, i * (drivingDuration / steps));
    }
  };

  const handleClick = () => {
    if (!isAnimating) {
      // Toggle between city and highway
      setMode(prev => prev === 'city' ? 'highway' : 'city');
      performEfficiencyDemo();
    }
  };

  const getEfficiencyColor = (level: number) => {
    if (level > 70) return 'from-green-400 to-emerald-500';
    if (level > 50) return 'from-yellow-400 to-orange-500';
    return 'from-orange-400 to-red-500';
  };

  const getEfficiencyRating = (mpg: number) => {
    if (mpg > 35) return 'Excellent';
    if (mpg > 25) return 'Good';
    if (mpg > 20) return 'Average';
    return 'Performance';
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 shadow-2xl cursor-pointer group hover:shadow-emerald-500/50 transition-all duration-500 overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20"
          animate={{
            background: isAnimating
              ? ["linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(34, 197, 94, 0.2))",
                 "linear-gradient(to right, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))"]
              : "linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(34, 197, 94, 0.2))"
          }}
          transition={{ duration: 2, repeat: isAnimating ? Infinity : 0 }}
        />
      </div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">EFFICIENCY</h3>
          </div>
          <div className="text-xs text-emerald-300 opacity-80">
            {mode.toUpperCase()}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                mode === 'city'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-emerald-200 hover:bg-white/10'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setMode('city');
              }}
            >
              <MapPin className="w-3 h-3" />
              <span>City</span>
            </button>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                mode === 'highway'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-emerald-200 hover:bg-white/10'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setMode('highway');
              }}
            >
              <Route className="w-3 h-3" />
              <span>Highway</span>
            </button>
          </div>
        </div>

        {/* Efficiency Visualization */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Central MPG Display */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Outer ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="6"
                />

                {/* Efficiency tick marks */}
                {[0, 10, 20, 30, 40, 50].map((mpg, index) => {
                  const angle = (mpg / 50) * 360 - 90;
                  const x1 = 100 + 70 * Math.cos((angle * Math.PI) / 180);
                  const y1 = 100 + 70 * Math.sin((angle * Math.PI) / 180);
                  const x2 = 100 + 80 * Math.cos((angle * Math.PI) / 180);
                  const y2 = 100 + 80 * Math.sin((angle * Math.PI) / 180);

                  return (
                    <g key={mpg}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth={index % 2 === 0 ? "2" : "1"}
                      />
                      {index % 2 === 0 && (
                        <text
                          x={100 + 90 * Math.cos((angle * Math.PI) / 180)}
                          y={100 + 90 * Math.sin((angle * Math.PI) / 180)}
                          fill="rgba(255, 255, 255, 0.6)"
                          fontSize="10"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${angle + 90}, ${100 + 90 * Math.cos((angle * Math.PI) / 180)}, ${100 + 90 * Math.sin((angle * Math.PI) / 180)})`}
                        >
                          {mpg}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Efficiency arc */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={`url(#efficiencyGradient-${mode})`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 80 * (1 - currentLevel / 100)
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="efficiencyGradient-city" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                  </linearGradient>
                  <linearGradient id="efficiencyGradient-highway" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="text-center">
                <motion.div
                  className="text-5xl font-bold text-white mb-2"
                  animate={{
                    scale: isAnimating ? [1, 1.1, 1] : 1,
                    color: mode === 'city' ? '#10b981' : '#3b82f6'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {currentMPG}
                </motion.div>
                <div className="text-lg text-emerald-300 font-medium mb-1">MPG</div>
                <div className="text-sm text-white/60 capitalize">{mode}</div>
              </div>
            </div>

            {/* Floating fuel droplets */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-emerald-400 rounded-full"
                      initial={{
                        x: 96 + Math.cos(i * 45 * Math.PI / 180) * 80,
                        y: 96 + Math.sin(i * 45 * Math.PI / 180) * 80,
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        x: 96,
                        y: 96,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Efficiency Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fuel className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white font-medium">Rating</span>
            </div>
            <span className="text-sm text-emerald-300 font-bold">
              {getEfficiencyRating(currentMPG)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Route className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white font-medium">Range</span>
            </div>
            <span className="text-sm text-emerald-300 font-bold">
              {Math.round(currentMPG * 15)} mi
            </span>
          </div>

          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-200">Distance</span>
                  <span className="text-white font-bold">{distance.toFixed(1)} mi</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-emerald-200">Fuel Used</span>
                  <span className="text-white font-bold">{(distance / currentMPG).toFixed(2)} gal</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 pt-2 border-t border-white/10"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-200">Transmission</span>
                  <span className="text-white">{transmission}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-200">Drivetrain</span>
                  <span className="text-white">{drivetrain}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Click hint */}
        {!isAnimating && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-xs text-emerald-300/60 text-center">
              Click to simulate
            </div>
          </motion.div>
        )}

        {/* Pulse effect when animating */}
        <AnimatePresence>
          {isAnimating && (
            <>
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-emerald-400"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.05, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-3xl border border-green-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.1, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveFuelEfficiency;
