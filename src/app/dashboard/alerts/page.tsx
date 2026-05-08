'use client';
import { motion } from 'framer-motion';
import { mockAlerts } from '@/lib/mockData';

const severityStyles = {
  critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.18)', emoji: '🚨' },
  high: { color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.18)', emoji: '⚠️' },
  medium: { color: '#3b82f6', bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.18)', emoji: '📋' },
};

export default function AlertsPage() {
  return (
    <div style={{ padding: '32px 40px', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-copper)', marginBottom: 6 }}>
          RISK MANAGEMENT
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 4 }}>
          Alerts & Incidents
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 32 }}>
          {mockAlerts.length} active alerts requiring attention
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {mockAlerts.map((alert, i) => {
          const sev = severityStyles[alert.severity as keyof typeof severityStyles];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: sev.bg,
                border: `1px solid ${sev.border}`,
                borderRadius: 20,
                padding: '28px 32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Pulse indicator */}
              <div style={{ position: 'absolute', top: 28, right: 28 }}>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.3, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: sev.color,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{sev.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{alert.type}</h3>
                    <span style={{
                      padding: '3px 12px',
                      background: `${sev.color}18`,
                      border: `1px solid ${sev.border}`,
                      borderRadius: 9999,
                      color: sev.color,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      {alert.severity}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 16 }}>
                    {alert.message}
                  </p>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Driver</p>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{alert.driver}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Events</p>
                      <p style={{ fontWeight: 700, color: sev.color, fontSize: '0.875rem' }}>{alert.count}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Trend</p>
                      <p style={{ fontWeight: 700, color: sev.color, fontSize: '0.875rem' }}>{alert.trend}</p>
                    </div>
                  </div>
                </div>
                <button style={{
                  padding: '9px 20px',
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(214,191,167,0.3)',
                  borderRadius: 9999,
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  View Driver →
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
