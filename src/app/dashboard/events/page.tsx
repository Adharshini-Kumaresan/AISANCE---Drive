'use client';
import { motion } from 'framer-motion';
import { mockEvents } from '@/lib/mockData';

const severityConfig = {
  high: { color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', label: 'High' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', label: 'Medium' },
  low: { color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', label: 'Low' },
};

export default function EventsPage() {
  return (
    <div style={{ padding: '32px 40px', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-copper)', marginBottom: 6 }}>
          INCIDENT TRACKING
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 4 }}>
          Event Logs
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 32 }}>
          {mockEvents.length} events · Last 7 days
        </p>
      </motion.div>

      {/* Severity summary */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'High Severity', count: mockEvents.filter(e => e.severity === 'high').length, color: '#ef4444' },
          { label: 'Medium Severity', count: mockEvents.filter(e => e.severity === 'medium').length, color: '#f59e0b' },
          { label: 'Low Severity', count: mockEvents.filter(e => e.severity === 'low').length, color: '#22c55e' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(214,191,167,0.2)',
              borderRadius: 14,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }}
            />
            <div>
              <p style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.count}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Event timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(214,191,167,0.2)',
          borderRadius: 20,
          padding: '28px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>
          Timeline
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: 20,
            top: 32,
            bottom: 32,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, var(--accent-gold), transparent)',
            opacity: 0.3,
          }} />

          {mockEvents.map((event, i) => {
            const sev = severityConfig[event.severity as keyof typeof severityConfig];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                style={{
                  display: 'flex',
                  gap: 20,
                  padding: '16px 0',
                  borderBottom: i < mockEvents.length - 1 ? '1px solid rgba(214,191,167,0.1)' : 'none',
                }}
              >
                {/* Dot */}
                <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ boxShadow: event.severity === 'high' ? ['0 0 0 0 rgba(239,68,68,0.3)', '0 0 0 8px transparent'] : [] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: sev.bg,
                      border: `2px solid ${sev.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                    }}
                  >
                    {event.type === 'Harsh Braking' ? '🛑' : event.type === 'Rapid Acceleration' ? '⚡' : event.type === 'Speed Spike' ? '📈' : '⚠️'}
                  </motion.div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                          {event.type}
                        </h4>
                        <span style={{
                          padding: '2px 10px',
                          background: sev.bg,
                          border: `1px solid ${sev.border}`,
                          borderRadius: 9999,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: sev.color,
                        }}>
                          {sev.label}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {event.driver} · {event.timestamp}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 1 }}>WRMS</p>
                        <p style={{ fontWeight: 800, color: event.wrms > 0.6 ? '#ef4444' : 'var(--accent-copper)', fontSize: '0.95rem' }}>
                          {event.wrms}
                        </p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 1 }}>Speed</p>
                        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{event.speed} km/h</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 1 }}>Cause</p>
                        <p style={{ fontWeight: 600, color: event.cause.includes('Driver') ? '#ef4444' : '#22c55e', fontSize: '0.8rem' }}>
                          {event.cause}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
