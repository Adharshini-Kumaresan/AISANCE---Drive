'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Platform', href: '#solution' },
  { label: 'Intelligence', href: '#how-it-works' },
  { label: 'Fleet', href: '#value' },
  { label: 'Insights', href: '#impact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60));
    return () => unsub();
  }, [scrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '10px 40px' : '22px 40px',
        background: scrolled ? 'rgba(245, 242, 236, 0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(214, 191, 167, 0.2)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src="/logo.png"
            alt="AISANCE Drive"
            width={36}
            height={36}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              color: 'var(--text-primary)',
            }}>
              AISANCE
            </span>
            <span style={{
              fontSize: '0.55rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: 'var(--accent-copper)',
            }}>
              DRIVE
            </span>
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {navLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            style={{
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link
          href="/login"
          style={{
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '8px 22px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(17,17,17,0.15)',
            transition: 'all 0.3s',
            display: 'inline-block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent-gold)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(17,17,17,0.15)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          Login
        </Link>
        <a
          href="#cta"
          onClick={(e) => { e.preventDefault(); document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{
            textDecoration: 'none',
            color: '#fff',
            fontSize: '0.875rem',
            fontWeight: 600,
            padding: '9px 22px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #C8A882, #B87333)',
            boxShadow: '0 4px 16px rgba(184,115,51,0.3)',
            transition: 'all 0.3s',
            letterSpacing: '0.01em',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(184,115,51,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(184,115,51,0.3)')}
        >
          Book Demo
        </a>
      </div>
    </motion.nav>
  );
}
