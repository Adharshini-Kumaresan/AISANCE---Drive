'use client';
import { motion } from 'framer-motion';
import { mockDrivers } from '@/lib/mockData';
import ScoreRing from '@/components/dashboard/ScoreRing';
import Link from 'next/link';

export default function DriversPage() {
  return (
    <div style={{ padding: '32px 40px', minHeight: '100vh' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-copper)', marginBottom: 6 }}>
          DRIVER INTELLIGENCE
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 4 }}>
          All Drivers
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 32 }}>
          {mockDrivers.length} drivers · Ranked by comfort score
        </p>
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 28,
          flexWrap: 'wrap',
        }}
      >
        {['All', 'Top Performers', 'Needs Attention', 'Trending Up', 'Trending Down'].map((f, i) => (
          <button
            key={f}
            style={{
              padding: '7px 18px',
              borderRadius: 9999,
              border: i === 0 ? '1px solid rgba(184,115,51,0.4)' : '1px solid rgba(214,191,167,0.2)',
              background: i === 0 ? 'rgba(184,115,51,0.08)' : 'rgba(255,255,255,0.5)',
              color: i === 0 ? 'var(--accent-copper)' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s',
            }}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Driver cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
        {mockDrivers.map((driver, i) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
          >
            <Link href={`/dashboard/drivers/${driver.id}`} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(184,115,51,0.12)' }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(214,191,167,0.2)',
                  borderRadius: 20,
                  padding: '24px 28px',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 280,
                }}
              >
                {/* Risk Tag */}
                <div style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: driver.risk === 'High-Risk' ? 'rgba(239,68,68,0.1)' 
                    : driver.risk === 'Needs Improvement' ? 'rgba(184,115,51,0.1)'
                    : 'rgba(34,197,94,0.1)',
                  color: driver.risk === 'High-Risk' ? '#ef4444'
                    : driver.risk === 'Needs Improvement' ? 'var(--accent-copper)'
                    : '#22c55e',
                  border: `1px solid ${driver.risk === 'High-Risk' ? 'rgba(239,68,68,0.2)' : 'transparent'}`
                }}>
                  {driver.risk}
                </div>

                {/* Top section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(200,168,130,0.25), rgba(184,115,51,0.15))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: 'var(--accent-copper)',
                    border: '2px solid rgba(184,115,51,0.2)',
                    flexShrink: 0,
                  }}>
                    {driver.name[0]}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                        {driver.name}
                      </h3>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        fontWeight: 700, 
                        background: driver.badge === 'Stable' ? '#22c55e' : '#B87333',
                        color: '#fff',
                        padding: '1px 6px',
                        borderRadius: 4,
                        textTransform: 'uppercase'
                      }}>
                        {driver.badge}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                      {driver.route}
                    </p>
                  </div>
                </div>

                {/* Score rings */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 24 }}>
                  <ScoreRing score={driver.score} size={80} strokeWidth={7} color={driver.score < 65 ? '#ef4444' : '#B87333'} label="Overall Score" />
                  <ScoreRing score={driver.consistency} size={80} strokeWidth={7} color="#C8A882" label="Consistency" />
                </div>

                {/* Accountability Stats */}
                <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Weekly Trend</p>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: driver.trend === 'up' ? '#22c55e' : '#ef4444' }}>
                      {driver.trend === 'up' ? '↑ +4.2%' : '↓ -2.8%'}
                    </span>
                  </div>
                  <div style={{ width: 1, background: 'rgba(214,191,167,0.2)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Driver Accountability</p>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {driver.driverContrib}%
                    </span>
                  </div>
                  <div style={{ width: 1, background: 'rgba(214,191,167,0.2)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Trips</p>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {driver.trips}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
