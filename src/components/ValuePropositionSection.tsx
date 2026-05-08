'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    title: 'Driver Consistency',
    desc: 'Rank and track driver performance over time. Reward consistency. Identify training opportunities early.',
    icon: '🎯',
    metric: '92%',
    metricLabel: 'Consistency Score',
    color: '#C8A882',
  },
  {
    title: 'Passenger Comfort',
    desc: 'Real-time WRMS comfort indices that quantify the passenger experience on every single trip.',
    icon: '💎',
    metric: '4.8',
    metricLabel: 'Comfort Rating',
    color: '#B87333',
  },
  {
    title: 'Operational Control',
    desc: 'Fleet-wide visibility into driver behavior, discomfort attribution, and performance trends.',
    icon: '⚙️',
    metric: '360°',
    metricLabel: 'Fleet Visibility',
    color: '#D6BFA7',
  },
  {
    title: 'Predictable Performance',
    desc: 'AI-powered predictions that flag declining performance before it impacts passengers or operations.',
    icon: '📊',
    metric: '3.2×',
    metricLabel: 'Faster Improvement',
    color: '#C8A882',
  },
];

export default function ValuePropositionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="value" ref={ref} style={{ background: 'var(--bg-primary)', padding: '140px 0' }}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 16 }}
        >
          VALUE PROPOSITION
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-headline"
          style={{ color: 'var(--text-primary)', marginBottom: 16 }}
        >
          Four pillars of
          <br />
          <span className="gradient-text">intelligent mobility.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 500, marginBottom: 72, lineHeight: 1.7 }}
        >
          Every capability engineered to deliver measurable, compounding improvements to your fleet.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              style={{
                background: 'rgba(255,255,255,0.75)',
                border: `1px solid ${hoveredIdx === i ? `${card.color}60` : 'rgba(214,191,167,0.2)'}`,
                borderRadius: 24,
                padding: '40px 36px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.3s',
              }}
              whileHover={{
                y: -8,
                rotateY: 3,
                rotateX: -3,
                transition: { duration: 0.3 },
              }}
            >
              {/* Glow */}
              <motion.div
                animate={hoveredIdx === i ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 0%, ${card.color}18 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Shimmer sweep */}
              {hoveredIdx === i && (
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: 0.4 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(90deg, transparent, ${card.color}30, transparent)`,
                    pointerEvents: 'none',
                  }}
                />
              )}

              <div style={{ fontSize: '2rem', marginBottom: 20 }}>{card.icon}</div>

              <div style={{ marginBottom: 8 }}>
                <span style={{
                  fontSize: '2.8rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: card.color,
                }}>
                  {card.metric}
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 20 }}>
                {card.metricLabel}
              </p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.01em' }}>
                {card.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.9rem' }}>
                {card.desc}
              </p>

              {/* Bottom accent line */}
              <motion.div
                animate={hoveredIdx === i ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
