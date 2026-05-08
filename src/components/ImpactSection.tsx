'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 68, unit: '%', label: 'Reduction in Harsh Braking', prefix: '' },
  { value: 4.8, unit: '/5', label: 'Average Comfort Rating', prefix: '' },
  { value: 91, unit: '%', label: 'Fleet Visibility Improvement', prefix: '' },
  { value: 3.2, unit: '×', label: 'Faster Driver Improvement', prefix: '' },
];

function AnimatedNumber({ value, unit, prefix, trigger }: { value: number; unit: string; prefix: string; trigger: boolean }) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = 0;
    const end = value;
    const duration = 2000;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(parseFloat((start + (end - start) * eased).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, value]);

  return (
    <span>{prefix}{displayed}{unit}</span>
  );
}

const waveformData = [3, 8, 5, 12, 7, 3, 6, 15, 4, 9, 6, 3, 8, 11, 5, 7, 4, 6, 9, 3];

export default function ImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="impact" ref={ref} style={{ background: 'var(--bg-dark)', padding: '140px 0', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 16 }}
          >
            MEASURABLE IMPACT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-headline"
            style={{ color: 'var(--text-light)' }}
          >
            Numbers that
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>define excellence.</span>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 80 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(214,191,167,0.12)',
                borderRadius: 20,
                padding: '36px 32px',
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
                background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                opacity: 0.5,
              }} />
              <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 8,
              }}>
                <AnimatedNumber {...stat} trigger={inView} />
              </div>
              <p style={{ color: 'rgba(245,245,245,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Waveform visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(214,191,167,0.1)',
            borderRadius: 24,
            padding: '40px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: 'rgba(245,245,245,0.5)', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: 4 }}>COMFORT INDEX OVER TIME</p>
              <p style={{ color: '#F5F5F5', fontWeight: 600, fontSize: '1.1rem' }}>Ride Smoothness Trend</p>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {[
                { label: 'Before', color: 'rgba(214,191,167,0.4)' },
                { label: 'After AISANCE', color: 'var(--accent-copper)' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 24, height: 2, background: item.color, borderRadius: 1 }} />
                  <span style={{ color: 'rgba(245,245,245,0.6)', fontSize: '0.8rem' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div style={{ height: 120, position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            {waveformData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                {/* Before bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={inView ? { height: v * 3 } : { height: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.04 }}
                  style={{
                    width: '100%',
                    background: 'rgba(214,191,167,0.3)',
                    borderRadius: 3,
                  }}
                />
                {/* After bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={inView ? { height: Math.max(4, v * 1.2) } : { height: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.04 }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to top, rgba(184,115,51,0.8), var(--accent-copper))',
                    borderRadius: 3,
                  }}
                />
              </div>
            ))}

            {/* Labels */}
            <div style={{
              position: 'absolute',
              bottom: -24,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span style={{ color: 'rgba(245,245,245,0.4)', fontSize: '0.7rem' }}>Week 1</span>
              <span style={{ color: 'rgba(245,245,245,0.4)', fontSize: '0.7rem' }}>Week 10</span>
              <span style={{ color: 'rgba(245,245,245,0.4)', fontSize: '0.7rem' }}>Week 20</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
