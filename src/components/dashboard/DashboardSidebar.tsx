'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '@/lib/firebase';

const navItems = [
  {
    id: 'overview',
    label: 'Fleet Overview',
    path: '/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'drivers',
    label: 'Drivers',
    path: '/dashboard/drivers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'trips',
    label: 'Trip Analysis',
    path: '/dashboard/trips',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9h12M3 5h8M3 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'events',
    label: 'Event Logs',
    path: '/dashboard/events',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v2M9 14v2M2 9h2M14 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'alerts',
    label: 'Alerts',
    path: '/dashboard/alerts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L15.5 13.5H2.5L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 7v3M9 12.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'insights',
    label: 'AI Insights',
    path: '/dashboard/insights',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C5.686 2 3 4.686 3 8c0 2.1 1.05 3.95 2.65 5.1V15h6.7v-1.9C13.95 11.95 15 10.1 15 8c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6.5 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/** Returns the user's initials from their display name or email */
function getInitials(user: User | null): string {
  if (!user) return 'U';
  if (user.displayName) {
    return user.displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return (user.email?.[0] ?? 'U').toUpperCase();
}

function getDisplayName(user: User | null): string {
  if (!user) return 'Fleet Manager';
  return user.displayName || user.email?.split('@')[0] || 'Fleet Manager';
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut(auth);
      router.replace('/login');
    } catch {
      setSigningOut(false);
    }
  };

  return (
    <div style={{
      width: 260,
      minHeight: '100vh',
      background: 'rgba(245,242,236,0.98)',
      backdropFilter: 'blur(30px)',
      borderRight: '1px solid rgba(214,191,167,0.2)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 0 40px rgba(0,0,0,0.04)',
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(214,191,167,0.2)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image
            src="/logo.png"
            alt="AISANCE Drive"
            width={42}
            height={42}
            style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
              AISANCE
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent-copper)', marginTop: 1 }}>
              DRIVE
            </div>
          </div>
        </Link>
      </div>

      {/* Status badge */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(214,191,167,0.1)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: 'rgba(184,115,51,0.08)',
          borderRadius: 8,
          border: '1px solid rgba(184,115,51,0.15)',
        }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-copper)', fontWeight: 600 }}>
            Live Monitoring
          </span>
        </div>
      </div>

      {/* Nav section label */}
      <div style={{ padding: '20px 24px 8px' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Navigation
        </p>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '4px 16px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              style={{ textDecoration: 'none', display: 'block', marginBottom: 2 }}
            >
              <motion.div
                whileHover={{ x: 2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 14px',
                  borderRadius: 10,
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(200,168,130,0.15), rgba(184,115,51,0.1))'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(184,115,51,0.2)'
                    : '1px solid transparent',
                  color: isActive ? 'var(--accent-copper)' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: 3,
                    background: 'linear-gradient(to bottom, var(--accent-gold), var(--accent-copper))',
                    borderRadius: '0 2px 2px 0',
                  }} />
                )}
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 500, letterSpacing: '-0.01em' }}>
                  {item.label}
                </span>
                {item.id === 'alerts' && (
                  <span style={{
                    marginLeft: 'auto',
                    background: 'rgba(239,68,68,0.1)',
                    color: '#ef4444',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 9999,
                    border: '1px solid rgba(239,68,68,0.2)',
                  }}>
                    3
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User profile + sign-out */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(214,191,167,0.15)' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', borderRadius: 10, padding: '8px 4px', transition: 'background 0.2s' }}
          onClick={() => setShowSignOut((v) => !v)}
          title="Click to sign out"
        >
          {/* Avatar — show photo if available */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="avatar"
              width={36}
              height={36}
              style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C8A882, #B87333)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.875rem',
              flexShrink: 0,
            }}>
              {getInitials(user)}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {getDisplayName(user)}
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email ?? 'Admin Access'}
            </p>
          </div>
          {/* Chevron */}
          <motion.svg
            animate={{ rotate: showSignOut ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{ flexShrink: 0, color: 'var(--text-muted)' }}
          >
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </div>

        {/* Sign-out popover */}
        <AnimatePresence>
          {showSignOut && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{ marginTop: 8 }}
            >
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                disabled={signingOut}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  borderRadius: 10,
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: signingOut ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.2s',
                  opacity: signingOut ? 0.6 : 1,
                }}
              >
                {signingOut ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                    style={{ width: 14, height: 14, border: '2px solid rgba(239,68,68,0.3)', borderTopColor: '#ef4444', borderRadius: '50%' }}
                  />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {signingOut ? 'Signing out…' : 'Sign Out'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
