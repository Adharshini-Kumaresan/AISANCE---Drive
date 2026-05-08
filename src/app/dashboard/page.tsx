'use client';
import { motion } from 'framer-motion';
import { fleetSummary, mockDrivers, comfortTrendData } from '@/lib/mockData';
import ScoreRing from '@/components/dashboard/ScoreRing';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Link from 'next/link';

const cardAnim = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: 'rgba(245,242,236,0.95)',
        border: '1px solid rgba(214,191,167,0.3)',
        borderRadius: 10,
        padding: '10px 14px',
        backdropFilter: 'blur(10px)',
      }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-copper)' }}>
          {payload[0].value}
          <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 2 }}>/100</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div style={{ padding: '32px 40px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-copper)', marginBottom: 6 }}>
            {fleetSummary.operator} — {fleetSummary.location}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Driver Comfort Analytics
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>
                {fleetSummary.program} · Live monitoring
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
        {[
          { label: 'Fleet Comfort Score', value: `${fleetSummary.avgComfort}`, unit: '/100', trend: fleetSummary.weeklyTrend, color: '#B87333' },
          { label: 'Active Drivers Today', value: `${fleetSummary.activeToday}`, unit: `/${fleetSummary.totalDrivers}`, trend: '', color: '#C8A882' },
          { label: 'Total Trips (Month)', value: `${fleetSummary.totalTrips}`, unit: '', trend: '+12 this week', color: '#B87333' },
          { label: 'Needs Attention', value: `${fleetSummary.needsAttention}`, unit: ' drivers', trend: '↑ from 1', color: '#ef4444' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            variants={cardAnim}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(214,191,167,0.18)',
              borderRadius: 18,
              padding: '24px 24px 20px',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${kpi.color}40, ${kpi.color})`,
              opacity: 0.7,
            }} />
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
              {kpi.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: kpi.color }}>
                {kpi.value}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>{kpi.unit}</span>
            </div>
            {kpi.trend && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 6, fontWeight: 500 }}>
                {kpi.trend}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24, marginBottom: 24 }}>
        {/* Comfort trend chart */}
        <motion.div
          variants={cardAnim}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(214,191,167,0.18)',
            borderRadius: 20,
            padding: '28px 28px 20px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                Comfort Trend
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Fleet-Wide Performance
              </h3>
            </div>
            <span style={{
              background: 'rgba(184,115,51,0.1)',
              border: '1px solid rgba(184,115,51,0.2)',
              color: 'var(--accent-copper)',
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              Last 12 Weeks
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={comfortTrendData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="comfortGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B87333" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#B87333" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(214,191,167,0.2)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" stroke="#B87333" strokeWidth={2} fill="url(#comfortGrad)" dot={false} activeDot={{ r: 4, fill: '#B87333', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Discomfort attribution */}
        <motion.div
          variants={cardAnim}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(214,191,167,0.18)',
            borderRadius: 20,
            padding: '28px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            Discomfort Attribution
          </p>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 28 }}>
            Driver vs Road
          </h3>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 24 }}>
            <ScoreRing score={fleetSummary.avgDiscomfortContrib} size={100} strokeWidth={8} color="#B87333" label="Driver" />
            <ScoreRing score={fleetSummary.avgRoadContrib} size={100} strokeWidth={8} color="#C8A882" label="Road" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Driver-Induced', value: fleetSummary.avgDiscomfortContrib, color: '#B87333' },
              { label: 'Road-Induced', value: fleetSummary.avgRoadContrib, color: '#C8A882' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>{item.value}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(214,191,167,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: '100%', background: item.color, borderRadius: 3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Driver rankings */}
      <motion.div
        variants={cardAnim}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.75)',
          border: '1px solid rgba(214,191,167,0.18)',
          borderRadius: 20,
          padding: '28px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              Driver Rankings
            </p>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              All Drivers
            </h3>
          </div>
          <Link href="/dashboard/drivers" style={{
            textDecoration: 'none',
            color: 'var(--accent-copper)',
            fontSize: '0.8rem',
            fontWeight: 600,
            border: '1px solid rgba(184,115,51,0.2)',
            padding: '6px 16px',
            borderRadius: 9999,
            transition: 'all 0.2s',
          }}>
            View All →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {mockDrivers.map((driver, i) => (
            <Link key={driver.id} href={`/dashboard/drivers/${driver.id}`} style={{ textDecoration: 'none' }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                whileHover={{ x: 2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  background: 'rgba(245,242,236,0.5)',
                  border: '1px solid rgba(214,191,167,0.12)',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {/* Rank */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: i < 3 ? 'linear-gradient(135deg, #C8A882, #B87333)' : 'rgba(214,191,167,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: i < 3 ? '#fff' : 'var(--text-muted)',
                  flexShrink: 0,
                }}>
                  {driver.rank}
                </div>

                {/* Avatar */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(200,168,130,0.3), rgba(184,115,51,0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-copper)',
                  flexShrink: 0,
                }}>
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {driver.name}
                    </p>
                    <span style={{ fontSize: '0.8rem' }}>{driver.badge}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ flex: 1, height: 4, background: 'rgba(214,191,167,0.2)', borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${driver.score}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.06 }}
                        style={{
                          height: '100%',
                          background: driver.score >= 85 ? '#22c55e' : driver.score >= 70 ? '#B87333' : '#ef4444',
                          borderRadius: 2,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: driver.score >= 85 ? '#22c55e' : driver.score >= 70 ? 'var(--accent-copper)' : '#ef4444', minWidth: 28 }}>
                      {driver.score}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: driver.trend === 'up' ? '#22c55e' : driver.trend === 'down' ? '#ef4444' : 'var(--text-muted)',
                  }}>
                    {driver.trend === 'up' ? '↑' : driver.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
      {/* Fleet Comparison */}
      <motion.div
        variants={cardAnim}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginTop: 24,
        }}
      >
        {/* Top 3 */}
        <div style={{
          background: 'rgba(34,197,94,0.03)',
          border: '1px solid rgba(34,197,94,0.15)',
          borderRadius: 24,
          padding: '28px',
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            Top 3 Performers
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockDrivers.slice(0, 3).map((d, i) => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fff', borderRadius: 12, border: '1px solid rgba(34,197,94,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontWeight: 800, color: '#22c55e' }}>#{i + 1}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 800, color: '#22c55e' }}>{d.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 3 */}
        <div style={{
          background: 'rgba(239,68,68,0.03)',
          border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: 24,
          padding: '28px',
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            Attention Required (Bottom 3)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...mockDrivers].reverse().slice(0, 3).map((d, i) => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fff', borderRadius: 12, border: '1px solid rgba(239,68,68,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontWeight: 800, color: '#ef4444' }}>#{10 - i}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 800, color: '#ef4444' }}>{d.score}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
