'use client';
import { motion } from 'framer-motion';
import { mockTrips } from '@/lib/mockData';

export default function TripsPage() {
  return (
    <div style={{ padding: '32px 40px', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-copper)', marginBottom: 6 }}>TRIP INTELLIGENCE</p>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 4 }}>
          Trip Analysis
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 32 }}>
          {mockTrips.length} trips · Last 7 days
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {mockTrips.map((trip, i) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            whileHover={{ y: -2 }}
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(214,191,167,0.2)',
              borderRadius: 20,
              padding: '28px 32px',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Comfort indicator bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 4,
              background: trip.avgComfort >= 85 ? '#22c55e' : trip.avgComfort >= 70 ? 'linear-gradient(to bottom, #C8A882, #B87333)' : '#ef4444',
              borderRadius: '20px 0 0 20px',
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
              {/* Route */}
              <div>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: 4 }}>{trip.route}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 6 }}>{trip.driverName} · {trip.date} {trip.time}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.04)', padding: '2px 8px', borderRadius: 6 }}>
                    {trip.duration}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.04)', padding: '2px 8px', borderRadius: 6 }}>
                    {trip.distance}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              {[
                { label: 'Driver Comfort Score', value: `${trip.avgComfort}`, sub: '/100', color: trip.avgComfort >= 85 ? '#22c55e' : trip.avgComfort >= 70 ? 'var(--accent-copper)' : '#ef4444' },
                { label: 'Driver-Induced Spikes', value: `${trip.driverInducedSpikes}`, sub: ' events', color: trip.driverInducedSpikes > 5 ? '#ef4444' : 'var(--text-primary)' },
                { label: 'Peak WRMS (Driver)', value: `${trip.peakWRMS}`, sub: '', color: trip.peakWRMS > 0.6 ? '#ef4444' : 'var(--text-primary)' },
                { label: 'Accountability', value: `${trip.driverDiscomfort}%`, sub: '', color: trip.driverDiscomfort > 40 ? '#ef4444' : 'var(--accent-copper)' },
              ].map(m => (
                <div key={m.label} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{m.label}</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: m.color, letterSpacing: '-0.02em' }}>
                    {m.value}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>{m.sub}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom insight */}
            <div style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: '1px solid rgba(214,191,167,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.9rem' }}>🛡️</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  Road-induced vibrations have been filtered out. Only driver-responsible discomfort is recorded.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <span key={si} style={{ color: si < trip.rating ? '#D6BFA7' : 'rgba(214,191,167,0.2)', fontSize: '1rem' }}>★</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
