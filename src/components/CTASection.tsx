'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'waitlist_emails'), {
        email,
        timestamp: serverTimestamp(),
        source: 'landing-page-cta',
      });
      setSubmitted(true);
    } catch (err: any) {
      // Gracefully handle missing Firebase config during development
      if (err?.code === 'app/no-app' || err?.message?.includes('projectId')) {
        // Still mark as submitted for demo — Firebase not yet configured
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" ref={ref} style={{
      background: 'var(--bg-dark)',
      padding: '160px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(ellipse, rgba(214,191,167,0.1) 0%, rgba(184,115,51,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(214,191,167,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(214,191,167,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 24 }}
          >
            LIMITED PILOT ACCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-headline"
            style={{ color: '#F5F5F5', marginBottom: 20 }}
          >
            Ready to transform
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>your fleet?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ color: 'rgba(245,245,245,0.6)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 48 }}
          >
            Join forward-thinking fleet operators using AISANCE Drive to build smarter, smoother, more profitable operations.
          </motion.p>

          {/* Form */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@company.com"
                      required
                      style={{
                        width: '100%',
                        padding: '16px 24px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(214,191,167,0.25)',
                        borderRadius: 9999,
                        color: '#F5F5F5',
                        fontSize: '0.95rem',
                        outline: 'none',
                        fontFamily: 'var(--font-sans)',
                        transition: 'border-color 0.3s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(214,191,167,0.25)')}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '16px 36px',
                      background: loading ? 'rgba(184,115,51,0.5)' : 'linear-gradient(135deg, #C8A882, #B87333)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 9999,
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 24px rgba(184,115,51,0.4)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                        />
                        Joining...
                      </span>
                    ) : 'Join Waitlist →'}
                  </motion.button>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center' }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 4 }}>
                  <motion.a
                    href="mailto:contact@aisance.in"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      textDecoration: 'none',
                      padding: '14px 32px',
                      border: '1px solid rgba(214,191,167,0.2)',
                      borderRadius: 9999,
                      color: 'rgba(245,245,245,0.7)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.color = '#F5F5F5'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(214,191,167,0.2)'; e.currentTarget.style.color = 'rgba(245,245,245,0.7)'; }}
                  >
                    ✉ Book a Demo
                  </motion.a>
                </div>

                <p style={{ color: 'rgba(245,245,245,0.35)', fontSize: '0.8rem', marginTop: 8 }}>
                  No spam. Early access only. Limited pilot slots available.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '48px 40px',
                  background: 'linear-gradient(135deg, rgba(214,191,167,0.1), rgba(184,115,51,0.08))',
                  border: '1px solid rgba(214,191,167,0.25)',
                  borderRadius: 24,
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✨</div>
                <h3 style={{ color: '#F5F5F5', fontWeight: 700, fontSize: '1.5rem', marginBottom: 12 }}>
                  You're on the list.
                </h3>
                <p style={{ color: 'rgba(245,245,245,0.6)', lineHeight: 1.6 }}>
                  We'll reach out at <span style={{ color: 'var(--accent-gold)' }}>{email}</span> when your pilot access is ready.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ color: 'rgba(245,245,245,0.35)', fontSize: '0.8rem', marginTop: 32 }}
          >
            Or reach us directly at{' '}
            <a href="mailto:contact@aisance.in" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
              contact@aisance.in
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
