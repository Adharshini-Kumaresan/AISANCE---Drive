'use client';
import { motion } from 'framer-motion';
import { mockInsights, mockDrivers } from '@/lib/mockData';
import Link from 'next/link';

const recommendations = [
  {
    title: 'Reduce Sudden Braking',
    desc: 'Maintain 3-second following distance and anticipate stops. Pre-emptive deceleration reduces WRMS by up to 42%.',
    icon: '🛑',
    impact: 'High Impact',
    color: '#ef4444',
    applicable: 2,
  },
  {
    title: 'Smoother Acceleration',
    desc: 'Progressive throttle application over 3-5 seconds eliminates acceleration spikes and improves passenger comfort by 28%.',
    icon: '⚡',
    impact: 'Medium Impact',
    color: '#f59e0b',
    applicable: 3,
  },
  {
    title: 'Stable Speed Maintenance',
    desc: 'Cruise control usage and RPM awareness reduces speed variance by 60% on highway segments.',
    icon: '📈',
    impact: 'Medium Impact',
    color: '#3b82f6',
    applicable: 4,
  },
  {
    title: 'Steering Smoothness',
    desc: 'Gradual steering inputs reduce lateral G-forces. Target below 0.3g for premium comfort ratings.',
    icon: '🎯',
    impact: 'Low Impact',
    color: '#22c55e',
    applicable: 1,
  },
];

export default function InsightsPage() {
  return (
    <div style={{ padding: '32px 40px', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-copper)', marginBottom: 6 }}>
          ADAPTIVE AI
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 4 }}>
          Driver Insights & Training
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 32 }}>
          AI-generated recommendations for continuous improvement
        </p>
      </motion.div>

      {/* Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 32 }}>
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            whileHover={{ y: -3 }}
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(214,191,167,0.2)',
              borderRadius: 20,
              padding: '28px',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 100,
              height: 100,
              background: `radial-gradient(circle, ${rec.color}12 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(20%, -20%)',
            }} />
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
              <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{rec.icon}</span>
              <div>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: rec.color,
                  background: `${rec.color}12`,
                  padding: '2px 10px',
                  borderRadius: 9999,
                  display: 'inline-block',
                  marginBottom: 6,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {rec.impact}
                </span>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', letterSpacing: '-0.01em' }}>
                  {rec.title}
                </h3>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.875rem', marginBottom: 16 }}>
              {rec.desc}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Applicable to {rec.applicable} driver{rec.applicable !== 1 ? 's' : ''}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Per-driver insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          background: 'rgba(11,11,11,0.97)',
          border: '1px solid rgba(214,191,167,0.15)',
          borderRadius: 24,
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 80% 50%, rgba(184,115,51,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
              Adaptive Intelligence
            </p>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F5F5F5' }}>
              Pilot Program Driver Intelligence
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {mockInsights.map((driverInsight, di) => {
            const driver = mockDrivers.find(d => d.id === driverInsight.driverId);
            return (
              <div key={driverInsight.driverId} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(214,191,167,0.08)',
                borderRadius: 16,
                padding: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(200,168,130,0.3), rgba(184,115,51,0.2))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, color: 'var(--accent-gold)', fontSize: '0.875rem',
                    }}>
                      {driverInsight.name[0]}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#F5F5F5', fontSize: '0.95rem' }}>{driverInsight.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.45)' }}>
                        Score: {driver?.score}/100 · {driver?.route}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/drivers/${driverInsight.driverId}`} style={{
                    textDecoration: 'none',
                    padding: '7px 16px',
                    border: '1px solid rgba(214,191,167,0.2)',
                    borderRadius: 9999,
                    color: 'var(--accent-gold)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}>
                    View Driver Profile →
                  </Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                  {driverInsight.insights.map((insight, ii) => (
                    <div key={ii} style={{
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${insight.priority === 'high' ? 'rgba(239,68,68,0.2)' : insight.priority === 'action' ? 'rgba(184,115,51,0.25)' : 'rgba(214,191,167,0.08)'}`,
                      borderRadius: 10,
                      display: 'flex',
                      gap: 10,
                    }}>
                      <span style={{ flexShrink: 0 }}>
                        {insight.priority === 'high' ? '🔴' : insight.priority === 'action' ? '💡' : '📊'}
                      </span>
                      <p style={{ fontSize: '0.825rem', color: 'rgba(245,245,245,0.7)', lineHeight: 1.5 }}>
                        {insight.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
