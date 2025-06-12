import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Gauge, TrendingUp } from 'lucide-react';

interface InteractiveSpeedometerProps {
  maxSpeed: number;
  acceleration: string; // e.g., "0-60 mph in 3.9s"
  horsepower: string; // e.g., "542 hp"
  className?: string;
}

const InteractiveSpeedometer: React.FC<InteractiveSpeedometerProps> = ({
  maxSpeed,
  acceleration,
  horsepower,
  className = ""
}) => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentRPM, setCurrentRPM] = useState(0);
  const [isRevving, setIsRevving] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [revCount, setRevCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Extract acceleration time from string (e.g., "3.9s" from "0-60 mph in 3.9s")
  const accelerationTime = parseFloat(acceleration.match(/(\d+\.?\d*)/)?.[1] || "4");

  // Extract horsepower number
  const hpNumber = parseInt(horsepower.match(/(\d+)/)?.[1] || "400");

  // Calculate performance metrics
  const maxRPM = 8000;
  const redlineRPM = 7000;

  // Auto-demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRevving) {
        performRevDemo();
      }
    }, 6000); // Demo every 6 seconds

    return () => clearInterval(interval);
  }, [isRevving]);

  const performRevDemo = () => {
    setIsRevving(true);
    setShowStats(true);
    setRevCount(prev => prev + 1);

    // Aggressive rev sequence
    const revSequence = async () => {
      // Quick rev to redline
      for (let i = 0; i <= 30; i++) {
        setTimeout(() => {
          const progress = i / 30;
          const rpmProgress = Math.pow(progress, 1.5); // Exponential curve
          const speedProgress = Math.pow(progress, 2); // Quadratic for speed

          setCurrentRPM(redlineRPM * rpmProgress);
          setCurrentSpeed(Math.min(maxSpeed * 0.9, 200) * speedProgress);
        }, i * 80);
      }

      // Hold at redline briefly
      setTimeout(() => {
        // Quick downshift simulation
        for (let i = 30; i >= 0; i--) {
          setTimeout(() => {
            const progress = i / 30;
            const rpmProgress = Math.pow(progress, 0.8);
            const speedProgress = Math.pow(progress, 1.2);

            setCurrentRPM(redlineRPM * rpmProgress);
            setCurrentSpeed(Math.min(maxSpeed * 0.9, 200) * speedProgress);

            if (i === 0) {
              setIsRevving(false);
              setTimeout(() => setShowStats(false), 2000);
            }
          }, (30 - i) * 60);
        }
      }, 1200);
    };

    revSequence();
  };

  const handleClick = () => {
    if (!isRevving) {
      performRevDemo();
    }
  };

  // Calculate needle rotations (0-180 degrees, starting from bottom left)
  const speedNeedleRotation = (currentSpeed / 200) * 180;
  const rpmNeedleRotation = (currentRPM / maxRPM) * 180;

  // Get RPM zone color
  const getRPMColor = (rpm: number) => {
    if (rpm > redlineRPM) return '#ef4444'; // Red
    if (rpm > redlineRPM * 0.8) return '#f97316'; // Orange
    if (rpm > redlineRPM * 0.6) return '#eab308'; // Yellow
    return '#22c55e'; // Green
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 shadow-2xl cursor-pointer group hover:shadow-orange-500/50 transition-all duration-500 overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 animate-pulse" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/10 to-transparent"
          animate={{ rotate: isRevving ? 360 : 0 }}
          transition={{ duration: 2, repeat: isRevving ? Infinity : 0, ease: "linear" }}
        />
      </div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white">PERFORMANCE</h3>
          </div>
          <div className="text-xs text-orange-300 opacity-80">
            Rev #{revCount}
          </div>
        </div>

        {/* Single Speedometer */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <div className="text-center mb-4">
              <div className="text-lg text-orange-300 font-semibold">SPEEDOMETER</div>
            </div>

            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background arc - semicircle from bottom left to bottom right */}
                <path
                  d="M 30 170 A 70 70 0 0 1 170 170"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="6"
                />

                {/* Speed arc */}
                <motion.path
                  d="M 30 170 A 70 70 0 0 1 170 170"
                  fill="none"
                  stroke="url(#speedGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: currentSpeed / 200 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Speed tick marks */}
                {[0, 40, 80, 120, 160, 200].map((speed, index) => {
                  const angle = (speed / 200) * 180 - 90;
                  const x1 = 100 + 60 * Math.cos((angle * Math.PI) / 180);
                  const y1 = 100 + 60 * Math.sin((angle * Math.PI) / 180);
                  const x2 = 100 + 70 * Math.cos((angle * Math.PI) / 180);
                  const y2 = 100 + 70 * Math.sin((angle * Math.PI) / 180);

                  return (
                    <g key={speed}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(255, 255, 255, 0.6)"
                        strokeWidth={index % 2 === 0 ? "2" : "1"}
                      />
                      {index % 2 === 0 && (
                        <text
                          x={100 + 80 * Math.cos((angle * Math.PI) / 180)}
                          y={100 + 80 * Math.sin((angle * Math.PI) / 180)}
                          fill="rgba(255, 255, 255, 0.8)"
                          fontSize="10"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {speed}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="30%" stopColor="#eab308" />
                    <stop offset="60%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>

                {/* Needle */}
                <motion.line
                  x1="100"
                  y1="170"
                  x2="100"
                  y2="50"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ rotate: speedNeedleRotation - 90 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ transformOrigin: "100px 170px" }}
                />

                {/* Center dot */}
                <circle cx="100" cy="170" r="4" fill="#ffffff" />
              </svg>

              {/* Speed display */}
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <div className="text-center">
                  <motion.div
                    className="text-4xl font-bold text-white mb-1"
                    animate={{ scale: isRevving ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Math.round(currentSpeed)}
                  </motion.div>
                  <div className="text-sm text-orange-300 font-medium">MPH</div>
                </div>
              </div>

              {/* RPM indicator */}
              <div className="absolute top-4 right-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-xs text-orange-300 mb-1">RPM</div>
                  <motion.div
                    className="text-lg font-bold text-white"
                    animate={{
                      color: getRPMColor(currentRPM)
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {(currentRPM / 1000).toFixed(1)}K
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white font-medium">Power</span>
            </div>
            <span className="text-sm text-orange-300 font-bold">{horsepower}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white font-medium">0-60</span>
            </div>
            <span className="text-sm text-orange-300 font-bold">{acceleration}</span>
          </div>

          <AnimatePresence>
            {isRevving && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-orange-500/20 border border-orange-400/30 rounded-xl p-3 text-center"
              >
                <div className="text-xs text-orange-200 mb-1">PERFORMANCE MODE</div>
                <div className="text-sm text-white font-bold">ENGAGED</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Click hint */}
        {!isRevving && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-xs text-orange-300/60 text-center">
              Click to rev
            </div>
          </motion.div>
        )}

        {/* Pulse effect when revving */}
        <AnimatePresence>
          {isRevving && (
            <>
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-orange-400"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.05, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-3xl border border-red-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.1, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveSpeedometer;
