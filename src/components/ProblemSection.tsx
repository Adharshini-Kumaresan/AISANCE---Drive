'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const problems = [
  {
    icon: '⚡',
    title: 'Harsh Braking',
    desc: 'Sudden deceleration events that spike discomfort indices and erode passenger trust.',
    stat: '68%',
    statLabel: 'of discomfort events',
  },
  {
    icon: '📈',
    title: 'Aggressive Acceleration',
    desc: 'Rapid throttle application causing g-force surges and measurable passenger anxiety.',
    stat: '3.4×',
    statLabel: 'higher WRMS spikes',
  },
  {
    icon: '🔄',
    title: 'Inconsistent Driving',
    desc: 'Erratic speed profiles and poor lane discipline creating unpredictable ride quality.',
    stat: '91%',
    statLabel: 'fleet visibility gap',
  },
  {
    icon: '🎯',
    title: 'No Driver Feedback',
    desc: 'Drivers operate without visibility into how their behavior impacts passenger experience.',
    stat: '0',
    statLabel: 'actionable insights',
  },
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="problem" ref={ref} style={{
      background: 'var(--bg-dark)',
      padding: '140px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(214,191,167,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(184,115,51,0.04) 0%, transparent 60%)',
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(214,191,167,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(214,191,167,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: 'var(--accent-copper)',
            marginBottom: 24,
          }}
        >
          THE REALITY
        </motion.p>

        {/* Headline */}
        <div style={{ maxWidth: 800, marginBottom: 80 }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-headline"
            style={{ color: 'var(--text-light)', lineHeight: 1.1 }}
          >
            Driving isn't the problem.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-headline"
            style={{ lineHeight: 1.1 }}
          >
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>How it's done is.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: 'rgba(245,245,245,0.6)',
              fontSize: '1.1rem',
              marginTop: 24,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Fleets operate blind. Drivers receive no actionable feedback. Passengers absorb the consequences — silently.
          </motion.p>
        </div>

        {/* Problem cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(214,191,167,0.12)',
                borderRadius: 20,
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.4s',
              }}
              whileHover={{
                y: -4,
                background: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(214,191,167,0.3)',
              }}
            >
              {/* Glow on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 120,
                height: 120,
                background: 'radial-gradient(circle, rgba(214,191,167,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(30%, -30%)',
              }} />

              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{p.icon}</div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 4,
              }}>
                {p.stat}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.4)', letterSpacing: '0.1em', marginBottom: 16, textTransform: 'uppercase' }}>
                {p.statLabel}
              </p>
              <h3 style={{ color: 'var(--text-light)', fontWeight: 600, fontSize: '1.1rem', marginBottom: 12 }}>
                {p.title}
              </h3>
              <p style={{ color: 'rgba(245,245,245,0.55)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
