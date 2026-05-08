'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showLabel?: boolean;
}

export default function ScoreRing({ score, size = 80, strokeWidth = 6, color = '#B87333', label, showLabel = true }: ScoreRingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(214,191,167,0.2)"
            strokeWidth={strokeWidth}
          />
          {/* Score arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ fontSize: size > 80 ? '1.4rem' : '0.95rem', fontWeight: 800, color, lineHeight: 1 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      {showLabel && label && (
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, textAlign: 'center' }}>{label}</p>
      )}
    </div>
  );
}
