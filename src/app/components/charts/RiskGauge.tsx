import { motion } from 'motion/react';

interface RiskGaugeProps {
  percentage: number;
  level: 'LOW' | 'MODERATE' | 'HIGH';
  animated?: boolean;
}

export function RiskGauge({ percentage, level, animated = true }: RiskGaugeProps) {
  const getColor = () => {
    switch (level) {
      case 'HIGH':
        return '#EF4444';
      case 'MODERATE':
        return '#F59E0B';
      case 'LOW':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />

          {/* Progress circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={getColor()}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={animated ? { strokeDashoffset } : { strokeDashoffset }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{percentage}%</div>
            <div className="text-sm text-gray-400 mt-1">Risk Score</div>
          </div>
        </motion.div>
      </div>

      {/* Level badge */}
      <motion.div
        className={`px-4 py-2 rounded-full font-semibold text-sm ${
          level === 'HIGH'
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : level === 'MODERATE'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {level} RISK
      </motion.div>
    </div>
  );
}
