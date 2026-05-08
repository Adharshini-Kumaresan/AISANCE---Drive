'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    label: 'Real-Time Analysis',
    title: 'Driver Behavior\nIntelligence',
    desc: 'Every braking event, acceleration pattern, and steering input analyzed in real-time to build a complete driver behavior profile.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 10v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Comfort Analytics',
    title: 'WRMS-Based\nComfort Monitoring',
    desc: 'Industry-standard Weighted Root Mean Square vibration analysis that quantifies passenger comfort with engineering precision.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14 L8 10 L12 16 L16 8 L20 13 L24 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Fleet Intelligence',
    title: 'Predictive\nPerformance Insights',
    desc: 'AI-powered fleet-wide analysis that identifies patterns, predicts issues, and delivers actionable optimization strategies.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12v4M20 12v4M12 8h4M12 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="solution" ref={ref} style={{ background: 'var(--bg-primary)', padding: '140px 0', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80, flexWrap: 'wrap', gap: 32 }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 16 }}
            >
              THE SOLUTION
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-headline"
              style={{ color: 'var(--text-primary)' }}
            >
              Intelligence that
              <br />
              <span className="gradient-text">transforms fleets.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 380, lineHeight: 1.7 }}
          >
            AISANCE Drive turns raw motion data into clarity — giving fleet operators and drivers the intelligence to improve every journey.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: i === 1 ? 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)' : 'rgba(255,255,255,0.7)',
                border: i === 1 ? '1px solid rgba(214,191,167,0.2)' : '1px solid rgba(214,191,167,0.15)',
                borderRadius: 24,
                padding: '44px 40px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                cursor: 'default',
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Shine */}
              <div style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                background: i === 1
                  ? 'radial-gradient(circle, rgba(214,191,167,0.1) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(214,191,167,0.15) 0%, transparent 70%)',
                borderRadius: '50%',
              }} />

              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                background: i === 1 ? 'rgba(214,191,167,0.1)' : 'rgba(184,115,51,0.08)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 28,
                color: i === 1 ? 'var(--accent-gold)' : 'var(--accent-copper)',
              }}>
                {f.icon}
              </div>

              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: i === 1 ? 'var(--accent-gold)' : 'var(--accent-copper)',
                marginBottom: 12,
                textTransform: 'uppercase',
              }}>
                {f.label}
              </p>
              <h3 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: i === 1 ? '#F5F5F5' : 'var(--text-primary)',
                marginBottom: 16,
                lineHeight: 1.2,
                whiteSpace: 'pre-line',
              }}>
                {f.title}
              </h3>
              <p style={{
                color: i === 1 ? 'rgba(245,245,245,0.6)' : 'var(--text-secondary)',
                lineHeight: 1.7,
                fontSize: '0.95rem',
              }}>
                {f.desc}
              </p>

              {/* Animated waveform for middle card */}
              {i === 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 28 }}>
                  {Array.from({ length: 20 }).map((_, j) => (
                    <motion.div
                      key={j}
                      animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                      transition={{ repeat: Infinity, duration: 1.2 + Math.random() * 0.8, delay: j * 0.08, ease: 'easeInOut' }}
                      style={{
                        width: 3,
                        background: 'linear-gradient(to top, rgba(214,191,167,0.3), rgba(214,191,167,0.8))',
                        borderRadius: 2,
                        minHeight: 4,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
