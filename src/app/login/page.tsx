'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, googleProvider, db } from '@/lib/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Auto-redirect if already logged in
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email === 'transport@psnacet.edu.in') {
          router.push('/dashboard');
        } else {
          router.push('/waitlist');
        }
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsub();
  }, [router]);

  const syncUserToFirestore = async (user: any) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        lastSeen: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      console.error('Error syncing user to Firestore:', err);
    }
  };

  if (checkingAuth) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ width: 40, height: 40, border: '3px solid rgba(184,115,51,0.2)', borderTopColor: '#B87333', borderRadius: '50%' }}
        />
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserToFirestore(result.user);
      if (result.user.email === 'transport@psnacet.edu.in') {
        router.push('/dashboard');
      } else {
        router.push('/waitlist');
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let user;
      if (mode === 'login') {
        const result = await signInWithEmailAndPassword(auth, email, password);
        user = result.user;
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        user = result.user;
      }
      await syncUserToFirestore(user);
      if (user?.email === 'transport@psnacet.edu.in') {
        router.push('/dashboard');
      } else {
        router.push('/waitlist');
      }
    } catch (err: any) {
      const msg = err.code === 'auth/user-not-found' ? 'No account found. Please sign up.'
        : err.code === 'auth/wrong-password' ? 'Incorrect password. Try again.'
        : err.code === 'auth/email-already-in-use' ? 'Email already registered. Please log in.'
        : err.code === 'auth/weak-password' ? 'Password must be at least 6 characters.'
        : err.code === 'auth/invalid-email' ? 'Invalid email address.'
        : err.message || 'Authentication failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Left panel — branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '46%',
          background: '#0B0B0B',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(214,191,167,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Top — logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <Image src="/logo.png" alt="AISANCE Drive" width={44} height={44} style={{ borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#F5F5F5', letterSpacing: '-0.02em' }}>AISANCE</div>
            <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>DRIVE</div>
          </div>
        </Link>

        {/* Center — headline */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', color: 'var(--accent-copper)', marginBottom: 24 }}
          >
            FLEET INTELLIGENCE PLATFORM
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#F5F5F5',
              marginBottom: 24,
            }}
          >
            Every journey,
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              understood.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ color: 'rgba(245,245,245,0.45)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 340 }}
          >
            Sign in to access your fleet intelligence dashboard, driver insights, and comfort analytics.
          </motion.p>
        </div>

        {/* Bottom — quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            padding: '20px 24px',
            background: 'rgba(214,191,167,0.06)',
            border: '1px solid rgba(214,191,167,0.12)',
            borderRadius: 14,
          }}
        >
          <p style={{ color: 'rgba(245,245,245,0.6)', fontSize: '0.875rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 12 }}>
            "The difference between data and intelligence is understanding."
          </p>
          <p style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            — AISANCE Drive
          </p>
        </motion.div>
      </motion.div>

      {/* Right panel — form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 64px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Mode switcher */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 40, background: 'rgba(0,0,0,0.05)', borderRadius: 12, padding: 4 }}>
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 9,
                  border: 'none',
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: mode === m ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: 8 }}>
                {mode === 'login' ? 'Welcome back' : 'Get started'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 32 }}>
                {mode === 'login' ? 'Sign in to your AISANCE Drive account.' : 'Create your fleet intelligence account.'}
              </p>

              {/* Google sign-in */}
              <motion.button
                whileHover={{ y: -1, boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGoogleSignIn}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  background: '#fff',
                  border: '1px solid rgba(214,191,167,0.3)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginBottom: 20,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                }}
              >
                {/* Google icon */}
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </motion.button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(214,191,167,0.3)' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>or</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(214,191,167,0.3)' }} />
              </div>

              {/* Email form */}
              <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@company.com"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(214,191,167,0.3)',
                      borderRadius: 10,
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(214,191,167,0.3)')}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                    required
                    minLength={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(214,191,167,0.3)',
                      borderRadius: 10,
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(214,191,167,0.3)')}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        padding: '12px 16px',
                        background: 'rgba(239,68,68,0.06)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: 10,
                        color: '#ef4444',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    width: '100%',
                    padding: '13px 20px',
                    background: loading ? 'rgba(184,115,51,0.5)' : 'linear-gradient(135deg, #C8A882, #B87333)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 16px rgba(184,115,51,0.35)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                      />
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    mode === 'login' ? 'Sign In →' : 'Create Account →'
                  )}
                </motion.button>
              </form>

              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 24 }}>
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-copper)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.8rem' }}
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 32 }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to AISANCE Drive</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
