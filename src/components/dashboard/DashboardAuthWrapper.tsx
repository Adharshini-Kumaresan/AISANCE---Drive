'use client';
import { useAuthGuard } from '@/lib/useAuthGuard';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardAuthWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthGuard();

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{
              width: 40,
              height: 40,
              border: '3px solid rgba(184,115,51,0.2)',
              borderTopColor: '#B87333',
              borderRadius: '50%',
            }}
          />
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: 'var(--accent-copper)',
          }}>
            AUTHENTICATING
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-secondary)' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
