'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#080808',
      padding: '80px 0 40px',
      borderTop: '1px solid rgba(214,191,167,0.1)',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60, flexWrap: 'wrap' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #C8A882, #B87333)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="9" r="2" fill="white"/>
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#F5F5F5', letterSpacing: '-0.02em' }}>AISANCE DRIVE</span>
            </div>
            <p style={{ color: 'rgba(245,245,245,0.45)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 260 }}>
              A luxury AI operating system for intelligent mobility comfort.
            </p>
            <p style={{ color: 'rgba(245,245,245,0.3)', fontSize: '0.8rem', marginTop: 20 }}>
              contact@aisance.in
            </p>
          </div>

          {/* Platform */}
          <div>
            <p style={{ color: 'rgba(245,245,245,0.5)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
              Platform
            </p>
            {['Driver Intelligence', 'Comfort Analytics', 'Fleet Overview', 'Trip Analysis', 'Event Logs'].map(item => (
              <p key={item} style={{ color: 'rgba(245,245,245,0.4)', fontSize: '0.875rem', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(214,191,167,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,245,245,0.4)')}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ color: 'rgba(245,245,245,0.5)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
              Company
            </p>
            {['About', 'Research', 'Careers', 'Press', 'Contact'].map(item => (
              <p key={item} style={{ color: 'rgba(245,245,245,0.4)', fontSize: '0.875rem', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(214,191,167,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,245,245,0.4)')}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ color: 'rgba(245,245,245,0.5)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
              Legal
            </p>
            {['Privacy Policy', 'Terms of Service', 'Data Processing', 'Security'].map(item => (
              <p key={item} style={{ color: 'rgba(245,245,245,0.4)', fontSize: '0.875rem', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(214,191,167,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,245,245,0.4)')}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ color: 'rgba(245,245,245,0.25)', fontSize: '0.8rem' }}>
            © 2025 AISANCE Drive. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.75rem',
            background: 'linear-gradient(90deg, rgba(214,191,167,0.5), rgba(184,115,51,0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}>
            INTELLIGENT MOBILITY COMFORT
          </p>
        </div>
      </div>
    </footer>
  );
}
