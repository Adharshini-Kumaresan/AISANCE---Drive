'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function DifferentiationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: 'var(--bg-primary)', padding: '140px 0', overflow: 'hidden' }}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 16, textAlign: 'center' }}
        >
          THE DIFFERENCE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-headline"
          style={{ color: 'var(--text-primary)', marginBottom: 80, textAlign: 'center' }}
        >
          Beyond <span className="gradient-text">what happened.</span>
        </motion.h2>

        {/* Split comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 28, overflow: 'hidden', boxShadow: 'var(--shadow-deep)' }}>
          {/* Left — others */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg-secondary)',
              padding: '64px 48px',
              borderRight: '1px solid rgba(214,191,167,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'rgba(90,90,90,0.2)',
            }} />
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 28 }}>
              Most Systems
            </p>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-secondary)', lineHeight: 1.2, marginBottom: 32 }}>
              "Tell you what happened."
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Trip happened at 2:34 PM',
                'Brake event detected',
                'Speed was 72 km/h',
                'Report generated',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <span style={{ color: 'rgba(90,90,90,0.5)', fontSize: '1rem' }}>○</span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: 40,
              padding: '20px 24px',
              background: 'rgba(90,90,90,0.06)',
              borderRadius: 12,
              border: '1px solid rgba(90,90,90,0.1)',
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Raw data. No context. No causation. No path to improvement.
              </p>
            </div>
          </motion.div>

          {/* Right — AISANCE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--bg-dark)',
              padding: '64px 48px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-copper))',
            }} />
            <div style={{
              position: 'absolute',
              bottom: -80,
              right: -80,
              width: 240,
              height: 240,
              background: 'radial-gradient(circle, rgba(184,115,51,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                AISANCE Drive
              </p>
              <span style={{
                background: 'linear-gradient(135deg, rgba(214,191,167,0.2), rgba(184,115,51,0.2))',
                border: '1px solid rgba(214,191,167,0.3)',
                padding: '4px 12px',
                borderRadius: 9999,
                color: 'var(--accent-gold)',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}>
                AI-Powered
              </span>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#F5F5F5', lineHeight: 1.2, marginBottom: 32 }}>
              "Tells you <span style={{ color: 'var(--accent-gold)' }}>why</span> it happened — and how to <span style={{ color: 'var(--accent-copper)' }}>improve it.</span>"
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Driver caused 40% of discomfort',
                'Comfort drops above 50 km/h',
                'Issues cluster in first 10 minutes',
                'Personalized improvement path',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(245,245,245,0.8)', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--accent-gold)', fontSize: '1rem' }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: 40,
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(214,191,167,0.08), rgba(184,115,51,0.05))',
              borderRadius: 12,
              border: '1px solid rgba(214,191,167,0.2)',
            }}>
              <p style={{ color: 'rgba(245,245,245,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Contextual intelligence. Causal clarity. A roadmap to measurable excellence.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: 64 }}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
            "The difference between data and intelligence is understanding."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
