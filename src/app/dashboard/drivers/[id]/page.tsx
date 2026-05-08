'use client';
import { motion } from 'framer-motion';
import { mockDrivers, mockTrips, mockInsights, mockEvents, behaviorWeightage } from '@/lib/mockData';
import ScoreRing from '@/components/dashboard/ScoreRing';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { use, useMemo } from 'react';
import Link from 'next/link';

const trendData = [
  { day: 'Mon', score: 62 }, { day: 'Tue', score: 58 }, { day: 'Wed', score: 64 },
  { day: 'Thu', score: 60 }, { day: 'Fri', score: 56 }, { day: 'Sat', score: 54 },
  { day: 'Sun', score: 54 },
];

export default function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const driver = useMemo(() => mockDrivers.find(d => d.id === id) || mockDrivers[0], [id]);
  const driverInsights = useMemo(() => mockInsights.find(i => i.driverId === driver.id) || mockInsights[0], [driver.id]);
  const driverTrips = useMemo(() => mockTrips.filter(t => t.driverId === driver.id), [driver.id]);
  const driverEvents = useMemo(() => mockEvents.filter(e => e.driver === driver.name), [driver.name]);

  return (
    <div style={{ padding: '32px 40px', minHeight: '100vh' }}>
      {/* Back link */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Link href="/dashboard/drivers" style={{
          textDecoration: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 24,
        }}>
          ← Back to Drivers
        </Link>
      </motion.div>

      {/* Driver header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(214,191,167,0.2)',
          borderRadius: 24,
          padding: '32px 36px',
          marginBottom: 24,
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap',
          boxShadow: '0 8px 32px rgba(184,115,51,0.05)',
        }}
      >
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #C8A882, #B87333)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          fontWeight: 800,
          color: '#fff',
          flexShrink: 0,
          border: '2px solid rgba(255,255,255,0.8)',
        }}>
          {driver.name[0]}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {driver.name}
            </h1>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              background: driver.badge === 'Stable' ? '#22c55e' : '#B87333',
              color: '#fff',
              padding: '2px 10px',
              borderRadius: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {driver.badge}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            PSNA Pilot Program · Bus {driver.id.replace('d', '')} · {driver.route}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <ScoreRing score={driver.score} size={90} strokeWidth={8} color={driver.score < 65 ? '#ef4444' : '#B87333'} label="Overall Score" />
          <ScoreRing score={driver.consistency} size={90} strokeWidth={8} color="#C8A882" label="Consistency" />
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 24 }}>
        {[
          { label: 'Smoothness Score', value: driverInsights.behaviorMetrics?.smoothness || 0, desc: 'IMU-derived motion fluidness', color: '#B87333' },
          { label: 'Aggression Index', value: driverInsights.behaviorMetrics?.aggression || 0, desc: 'Frequency of harsh inputs', color: driverInsights.behaviorMetrics?.aggression > 50 ? '#ef4444' : '#B87333' },
          { label: 'Stability Index', value: driverInsights.behaviorMetrics?.stability || 0, desc: 'Yaw/Lateral G consistency', color: '#C8A882' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(214,191,167,0.2)',
              borderRadius: 20,
              padding: '24px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>{m.label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: m.color }}>{m.value}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>%</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.desc}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Attribution & Logic */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(214,191,167,0.2)',
              borderRadius: 24,
              padding: '28px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Accountability Attribution</h3>
              <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>Driver: {driverInsights.contribution?.driver}%</span>
            </div>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Driver Contribution</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-copper)' }}>{driverInsights.contribution?.driver}%</span>
                </div>
                <div style={{ height: 10, background: 'rgba(214,191,167,0.15)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${driverInsights.contribution?.driver}%`, background: 'linear-gradient(90deg, #B87333, #C8A882)', borderRadius: 5 }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Road Contribution</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>{driverInsights.contribution?.road}%</span>
                </div>
                <div style={{ height: 10, background: 'rgba(214,191,167,0.15)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${driverInsights.contribution?.road}%`, background: 'rgba(0,0,0,0.1)', borderRadius: 5 }} />
                </div>
              </div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(184,115,51,0.06)', borderRadius: 16, border: '1px solid rgba(184,115,51,0.12)' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <strong>Insight:</strong> The score dropped this week primarily due to <span style={{ color: '#ef4444', fontWeight: 600 }}>harsh braking</span> and <span style={{ color: '#ef4444', fontWeight: 600 }}>instability during turns</span>. 
                Driver is responsible for {driverInsights.contribution?.driver}% of detected discomfort events.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(214,191,167,0.2)',
              borderRadius: 24,
              padding: '28px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>Score Calculation Logic</h3>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { label: 'Smoothness', weight: behaviorWeightage.smoothness, icon: '🌊' },
                { label: 'Spike Frequency', weight: behaviorWeightage.spikeFrequency, icon: '📈' },
                { label: 'Consistency', weight: behaviorWeightage.consistency, icon: '🎯' },
              ].map(w => (
                <div key={w.label} style={{ flex: 1, textAlign: 'center', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: 16 }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{w.icon}</div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{w.label}</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-copper)' }}>{w.weight}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: '#0B0B0B',
            borderRadius: 24,
            padding: '32px',
            color: '#F5F5F5',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(184,115,51,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span style={{ fontSize: '1.2rem' }}>💡</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>AI Suggestions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {driverInsights.insights.filter(ins => ins.type === 'suggestion' || ins.priority === 'high').map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                style={{
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.05)',
                  borderLeft: `4px solid ${insight.priority === 'high' ? '#ef4444' : '#B87333'}`,
                  borderRadius: '4px 12px 12px 4px',
                }}
              >
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(245,245,245,0.9)' }}>{insight.text}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: '16px', background: 'rgba(214,191,167,0.1)', borderRadius: 12, border: '1px solid rgba(214,191,167,0.2)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: 4 }}>COACHING TIP</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(245,245,245,0.6)', lineHeight: 1.5 }}>
              Focus on progressive braking techniques between 40-60 km/h to reduce WRMS spikes by an estimated 22%.
            </p>
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 24, marginBottom: 24 }}>
        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(214,191,167,0.2)',
            borderRadius: 24,
            padding: '28px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>7-Day Performance Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis domain={[0, 100]} hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Discomfort Events Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(214,191,167,0.2)',
            borderRadius: 24,
            padding: '28px',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>Discomfort Events Log</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Time</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Severity (WRMS)</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Cause</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>Event Description</th>
                </tr>
              </thead>
              <tbody>
                {driverEvents.map((ev, idx) => (
                  <tr key={ev.id} style={{ borderBottom: idx === driverEvents.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.03)' }}>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{ev.timestamp.split(' ')[1]}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700,
                        background: ev.severity === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(184,115,51,0.1)',
                        color: ev.severity === 'high' ? '#ef4444' : '#B87333'
                      }}>
                        {ev.wrms.toFixed(2)} ({ev.severity.toUpperCase()})
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--accent-copper)', fontWeight: 600 }}>{ev.cause}</td>
                    <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>{ev.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Trip Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid rgba(214,191,167,0.2)',
          borderRadius: 24,
          padding: '28px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Trip Analysis (Driver Accountability)</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>*Road-induced events excluded from count</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {driverTrips.map((trip) => (
            <div key={trip.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '16px 20px',
              background: 'rgba(0,0,0,0.02)',
              borderRadius: 16,
              border: '1px solid rgba(0,0,0,0.03)',
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: 2 }}>{trip.route}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{trip.date} · {trip.duration}</p>
              </div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Driver Comfort</p>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: trip.avgComfort < 70 ? '#ef4444' : 'var(--accent-copper)' }}>{trip.avgComfort}</span>
              </div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Driver-Induced Spikes</p>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: trip.driverInducedSpikes > 5 ? '#ef4444' : 'var(--text-primary)' }}>{trip.driverInducedSpikes}</span>
              </div>
              <div style={{ textAlign: 'center', minWidth: 100 }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Peak WRMS</p>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{trip.peakWRMS}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
