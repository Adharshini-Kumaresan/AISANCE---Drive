'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function WhyNowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: 'var(--bg-secondary)', padding: '160px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 24 }}
            >
              WHY NOW
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-headline"
              style={{ color: 'var(--text-primary)', marginBottom: 28 }}
            >
              Comfort is no longer
              <br />
              <span className="gradient-text">optional.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 40 }}
            >
              Modern passengers expect more than a destination — they expect an experience. Fleet operators face mounting pressure to demonstrate quality, consistency, and intelligence across every journey.
            </motion.p>
            <motion.a
              href="#cta"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                color: 'var(--accent-copper)',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
              }}
            >
              Join the waitlist →
            </motion.a>
          </div>

          {/* Right — metric cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                label: 'Passenger Expectation Gap',
                value: '73%',
                desc: 'of premium fleet passengers report ride quality as a primary satisfaction driver',
                trend: '↑ 23% since 2023',
              },
              {
                label: 'Fleet Quality Standard',
                value: '89%',
                desc: 'of operators lack real-time driver behavior visibility across their fleet',
                trend: '↓ Industry average',
              },
              {
                label: 'Comfort ROI',
                value: '4.1×',
                desc: 'return on investment from reduced complaints and improved driver retention',
                trend: '↑ Per route optimization',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(214,191,167,0.2)',
                  borderRadius: 16,
                  padding: '24px 28px',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--accent-copper)',
                  minWidth: 80,
                }}>
                  {item.value}
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent-gold-deep)', textTransform: 'uppercase', marginBottom: 6 }}>
                    {item.label}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 8 }}>
                    {item.desc}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-copper)', fontWeight: 600 }}>
                    {item.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
