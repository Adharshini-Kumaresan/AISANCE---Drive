'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function WaitlistPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    orgName: '',
    fleetSize: '',
    email: '',
    phone: '',
    transportType: 'Charter'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(214,191,167,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navigation Header */}
      <header style={{
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image src="/logo.png" alt="AISANCE logo" width={40} height={40} style={{ borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '-0.02em' }}>AISANCE</div>
            <div style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent-copper)' }}>DRIVE</div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            transition: 'color 0.3s'
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-copper)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          SIGN OUT
        </button>
      </header>

      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px 100px',
        zIndex: 1
      }}>
        <div style={{ width: '100%', maxWidth: 1100, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          
          {/* Left Side: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                background: 'rgba(184, 115, 51, 0.08)',
                border: '1px solid rgba(184, 115, 51, 0.2)',
                borderRadius: 100,
                color: 'var(--accent-copper)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: 24,
                textTransform: 'uppercase'
              }}
            >
              Exclusive Onboarding
            </motion.div>
            
            <h1 className="text-headline" style={{ marginBottom: 24, maxWidth: '12ch' }}>
              Fleet Access <br />
              <span className="gradient-text">Currently Limited</span>
            </h1>
            
            <p className="text-body" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 460, marginBottom: 40 }}>
              AISANCE Drive is currently onboarding selected fleet operators and transport systems to ensure the highest level of predictive intelligence and service quality.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { title: 'Priority Onboarding', desc: 'Direct integration support for institutions and large fleets.' },
                { title: 'Custom Analytics', desc: 'Tailored behavior modeling for your specific transport type.' },
                { title: 'Global Standards', desc: 'Enterprise-grade security and compliance for sensitive telemetry.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  style={{ display: 'flex', gap: 16 }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-copper)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card"
            style={{ padding: 48, position: 'relative', overflow: 'hidden' }}
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: 'rgba(52, 168, 83, 0.08)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 32px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 16 }}>Application Received</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
                  Thank you for your interest in AISANCE Drive. Our institutional onboarding team will review your fleet profile and contact you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-copper)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.05em' }}
                >
                  SUBMIT ANOTHER APPLICATION
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ marginBottom: 8 }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Fleet Application</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Priority onboarding for institutions and fleet operators.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Organization / Company</label>
                    <input 
                      required
                      style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.5)', outline: 'none', fontSize: '0.9rem' }}
                      placeholder="e.g. PSNA College"
                      value={formData.orgName}
                      onChange={e => setFormData({...formData, orgName: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fleet Size</label>
                    <input 
                      required
                      type="number"
                      style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.5)', outline: 'none', fontSize: '0.9rem' }}
                      placeholder="Number of vehicles"
                      value={formData.fleetSize}
                      onChange={e => setFormData({...formData, fleetSize: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Email</label>
                    <input 
                      required
                      type="email"
                      style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.5)', outline: 'none', fontSize: '0.9rem' }}
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                    <input 
                      required
                      type="tel"
                      style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.5)', outline: 'none', fontSize: '0.9rem' }}
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Transport Type</label>
                  <select 
                    style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.5)', outline: 'none', fontSize: '0.9rem', appearance: 'none' }}
                    value={formData.transportType}
                    onChange={e => setFormData({...formData, transportType: e.target.value})}
                  >
                    <option>Institutional / Education</option>
                    <option>Corporate Fleet</option>
                    <option>Public Transport</option>
                    <option>Logistics / Freight</option>
                    <option>Other</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', marginTop: 8, justifyContent: 'center', height: 56 }}
                >
                  {isSubmitting ? 'Requesting Access...' : 'Request Early Access'}
                </motion.button>

                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
                  Priority onboarding for institutions and fleet operators.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid var(--border-light)', background: 'rgba(245, 242, 236, 0.5)' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.1em' }}>
          &copy; 2026 AISANCE DRIVE INTELLIGENCE. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
