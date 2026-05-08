'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    id: '01',
    word: 'Sense',
    title: 'Sensor Fusion',
    desc: 'Accelerometers, gyroscopes, and GPS collect every micro-movement, vibration, and positioning shift in real time.',
    color: 'var(--accent-gold)',
  },
  {
    id: '02',
    word: 'Analyze',
    title: 'WRMS Computation',
    desc: 'ISO-standard Weighted Root Mean Square analysis processes raw vibration data into meaningful comfort metrics.',
    color: 'var(--accent-copper)',
  },
  {
    id: '03',
    word: 'Understand',
    title: 'AI Interpretation',
    desc: 'Machine learning models classify events, attribute causation, and distinguish driver-induced from road-induced discomfort.',
    color: '#C8A882',
  },
  {
    id: '04',
    word: 'Improve',
    title: 'Driver Feedback',
    desc: 'Personalized, actionable recommendations delivered to drivers and fleet managers to measurably improve every journey.',
    color: 'var(--accent-gold)',
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="how-it-works" ref={ref} style={{ background: 'var(--bg-secondary)', padding: '140px 0', overflow: 'hidden' }}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 16 }}
        >
          HOW IT WORKS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-headline"
          style={{ color: 'var(--text-primary)', marginBottom: 80 }}
        >
          The intelligence
          <br />
          <span className="gradient-text">pipeline.</span>
        </motion.h2>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            height: 1,
            background: 'linear-gradient(to right, transparent, var(--accent-gold), var(--accent-copper), var(--accent-gold), transparent)',
            opacity: 0.3,
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 32,
          }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative' }}
              >
                {/* Node circle */}
                <motion.div
                  animate={inView ? {
                    boxShadow: [
                      `0 0 0 0 ${step.color}40`,
                      `0 0 0 16px transparent`,
                    ],
                  } : {}}
                  transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.6 }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                    border: `2px solid ${step.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 32,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: step.color,
                  }}>
                    {step.id}
                  </span>
                </motion.div>

                <p style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: step.color,
                  marginBottom: 8,
                  lineHeight: 1,
                }}>
                  {step.word}
                </p>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: '0.9rem',
                }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SVG Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ marginTop: 80, padding: '40px', background: 'rgba(255,255,255,0.5)', borderRadius: 24, border: '1px solid rgba(214,191,167,0.2)', backdropFilter: 'blur(10px)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
            {steps.map((step, i) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '12px 28px',
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}40`,
                  borderRadius: 9999,
                  color: step.color,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                }}>
                  {step.word}
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                    style={{ margin: '0 12px', color: 'var(--accent-gold)', fontSize: '1.2rem' }}
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
