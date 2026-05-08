'use client';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Canvas-based frame sequence (using procedurally generated canvas art)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawFrame = (progress: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const t = progress;

      // Sky gradient - transitions from dawn to night
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
      const r1 = Math.round(245 - t * 80);
      const g1 = Math.round(242 - t * 90);
      const b1 = Math.round(236 - t * 120);
      const r2 = Math.round(239 - t * 120);
      const g2 = Math.round(234 - t * 130);
      const b2 = Math.round(226 - t * 140);
      skyGrad.addColorStop(0, `rgb(${r1},${g1},${b1})`);
      skyGrad.addColorStop(1, `rgb(${r2},${g2},${b2})`);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Horizon glow
      const horizonY = h * 0.55;
      const glowGrad = ctx.createRadialGradient(w / 2, horizonY, 0, w / 2, horizonY, w * 0.7);
      const glowAlpha = 0.15 + t * 0.25;
      glowGrad.addColorStop(0, `rgba(214,191,167,${glowAlpha})`);
      glowGrad.addColorStop(0.5, `rgba(184,115,51,${glowAlpha * 0.3})`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // Road
      const roadGrad = ctx.createLinearGradient(0, horizonY, 0, h);
      roadGrad.addColorStop(0, `rgba(${Math.round(60 - t * 20)},${Math.round(55 - t * 20)},${Math.round(50 - t * 15)}, 1)`);
      roadGrad.addColorStop(1, `rgba(${Math.round(40 - t * 15)},${Math.round(38 - t * 15)},${Math.round(35 - t * 10)}, 1)`);
      ctx.fillStyle = roadGrad;

      ctx.beginPath();
      ctx.moveTo(w * 0.2, h);
      ctx.lineTo(w * 0.8, h);
      ctx.lineTo(w * 0.55, horizonY);
      ctx.lineTo(w * 0.45, horizonY);
      ctx.closePath();
      ctx.fill();

      // Road center dashes
      const dashCount = 12;
      for (let i = 0; i < dashCount; i++) {
        const dashT = (i / dashCount + t * 0.3) % 1;
        const dashY = horizonY + (h - horizonY) * dashT;
        const dashW = 3 + dashT * 10;
        const dashH = 20 + dashT * 50;
        const dashX = w / 2;
        const alpha = dashT * 0.8;
        ctx.fillStyle = `rgba(214,191,167,${alpha})`;
        ctx.fillRect(dashX - dashW / 2, dashY, dashW, dashH);
      }

      // Landscape hills
      ctx.fillStyle = `rgba(${Math.round(180 - t * 60)},${Math.round(170 - t * 70)},${Math.round(155 - t * 60)},0.4)`;
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 20);
      for (let x = 0; x <= w; x += 20) {
        const y = horizonY + 20 + Math.sin(x * 0.005 + t * 2) * 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Trees silhouette
      const treeCount = 8;
      for (let i = 0; i < treeCount; i++) {
        const tx = (w * 0.05) + (i / treeCount) * (w * 0.35);
        const ty = horizonY + 5;
        const treeHeight = 40 + Math.sin(i * 1.5) * 20;
        const treeAlpha = 0.3 + t * 0.2;
        ctx.fillStyle = `rgba(${Math.round(80 - t * 30)},${Math.round(75 - t * 30)},${Math.round(65 - t * 25)},${treeAlpha})`;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx - 12, ty + treeHeight);
        ctx.lineTo(tx + 12, ty + treeHeight);
        ctx.closePath();
        ctx.fill();

        const tx2 = w - tx;
        ctx.beginPath();
        ctx.moveTo(tx2, ty);
        ctx.lineTo(tx2 - 12, ty + treeHeight);
        ctx.lineTo(tx2 + 12, ty + treeHeight);
        ctx.closePath();
        ctx.fill();
      }

      // Telemetry overlay at progress > 0.3
      if (t > 0.3) {
        const alpha = Math.min(1, (t - 0.3) * 3);

        // Grid lines
        ctx.strokeStyle = `rgba(214,191,167,${alpha * 0.1})`;
        ctx.lineWidth = 0.5;
        for (let gx = 0; gx < w; gx += 60) {
          ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
        }
        for (let gy = 0; gy < h; gy += 60) {
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
        }

        // Telemetry HUD elements
        ctx.strokeStyle = `rgba(214,191,167,${alpha * 0.6})`;
        ctx.lineWidth = 1;

        // Speed arc
        const arcX = w - 140, arcY = h - 140;
        const arcR = 70;
        ctx.beginPath();
        ctx.arc(arcX, arcY, arcR, Math.PI * 0.75, Math.PI * 2.25);
        ctx.stroke();

        // Speed needle
        const speed = 0.6 + t * 0.3;
        const angle = Math.PI * 0.75 + speed * Math.PI * 1.5;
        ctx.strokeStyle = `rgba(184,115,51,${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(arcX, arcY);
        ctx.lineTo(arcX + Math.cos(angle) * (arcR - 5), arcY + Math.sin(angle) * (arcR - 5));
        ctx.stroke();

        ctx.fillStyle = `rgba(214,191,167,${alpha})`;
        ctx.font = `${Math.round(10 + alpha * 2)}px Inter, sans-serif`;
        ctx.fillText(`${Math.round(40 + t * 60)} km/h`, arcX - 28, arcY + 20);

        // Comfort score
        const scoreX = 80, scoreY = h - 100;
        ctx.strokeStyle = `rgba(214,191,167,${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(scoreX - 60, scoreY - 30, 120, 55);
        ctx.fillStyle = `rgba(214,191,167,${alpha})`;
        ctx.font = `${Math.round(9)}px Inter`;
        ctx.fillText('COMFORT INDEX', scoreX - 42, scoreY - 10);
        ctx.font = `bold ${Math.round(20 + alpha * 2)}px Inter`;
        ctx.fillText(`${Math.round(60 + t * 32)}`, scoreX - 14, scoreY + 18);

        // WRMS waveform
        const waveY = 80;
        const waveStart = w / 2 - 120;
        ctx.strokeStyle = `rgba(184,115,51,${alpha * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x < 240; x++) {
          const wave = Math.sin((x * 0.08) + t * 10) * (8 - t * 5) + Math.sin(x * 0.15 + t * 6) * (4 - t * 3);
          if (x === 0) ctx.moveTo(waveStart + x, waveY + wave);
          else ctx.lineTo(waveStart + x, waveY + wave);
        }
        ctx.stroke();

        ctx.fillStyle = `rgba(214,191,167,${alpha * 0.7})`;
        ctx.font = '9px Inter';
        ctx.fillText('WRMS', waveStart - 40, waveY + 4);
      }

      // Light rays
      if (t > 0.6) {
        const rayAlpha = (t - 0.6) * 0.15;
        for (let r = 0; r < 6; r++) {
          const angle = (-30 + r * 12) * (Math.PI / 180);
          const rayGrad = ctx.createLinearGradient(
            w / 2, horizonY,
            w / 2 + Math.sin(angle) * w,
            horizonY - Math.cos(angle) * h
          );
          rayGrad.addColorStop(0, `rgba(214,191,167,${rayAlpha})`);
          rayGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(w / 2 - 8, horizonY);
          ctx.lineTo(w / 2 + 8, horizonY);
          ctx.lineTo(w / 2 + Math.sin(angle + 0.04) * w * 2, horizonY - h * 2);
          ctx.lineTo(w / 2 + Math.sin(angle - 0.04) * w * 2, horizonY - h * 2);
          ctx.closePath();
          ctx.fill();
        }
      }
    };

    const unsub = smoothProgress.on('change', (v) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(v);
    });

    drawFrame(0);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(smoothProgress.get());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      unsub();
      window.removeEventListener('resize', handleResize);
    };
  }, [smoothProgress]);

  const y1 = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);
  
  // N1: Fades out quickly at the start of scroll
  const opacity1 = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  
  // N2: Waits for N1 to be long gone before easing in
  const opacity2 = useTransform(smoothProgress, [0.28, 0.42, 0.55, 0.68], [0, 1, 1, 0]);
  
  // N3: Final beat
  const opacity3 = useTransform(smoothProgress, [0.72, 0.88, 1.0], [0, 1, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Canvas */}
        <motion.div style={{ scale, position: 'absolute', inset: 0 }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </motion.div>

        {/* Narrative 1 — CONTROL */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: opacity1,
            y: y1,
            zIndex: useTransform(smoothProgress, v => v < 0.2 ? 10 : 0),
            pointerEvents: useTransform(smoothProgress, v => v < 0.15 ? 'auto' : 'none'),
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'var(--accent-copper)',
              marginBottom: 32,
            }}>
              DRIVER INTELLIGENCE PLATFORM
            </p>
            <h1 className="text-display" style={{
              textAlign: 'center',
              color: 'var(--text-primary)',
              lineHeight: 1.0,
              maxWidth: 900,
            }}>
              Drive <span className="gradient-text">better.</span>
              <br />
              Not just faster.
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textAlign: 'center',
                fontSize: '1.2rem',
                marginTop: 28,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                background: 'linear-gradient(135deg, #C8A882 0%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Comfort intelligence for every journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                marginTop: 48,
              }}
            >
              <a href="#cta" onClick={(e) => { e.preventDefault(); document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', background: 'linear-gradient(135deg, #C8A882, #B87333)', color: '#fff', borderRadius: 9999, fontWeight: 600, fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(184,115,51,0.3)' }}>
                Book Demo →
              </a>
              <a href="/login" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', border: '1px solid rgba(17,17,17,0.2)', borderRadius: 9999, color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }}>
                Login →
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: 48,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)', fontWeight: 600 }}>SCROLL</p>
            <div style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, var(--accent-gold), transparent)',
            }} />
          </motion.div>
        </motion.div>

        {/* Narrative 2 — ANALYSIS */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: opacity2,
            zIndex: useTransform(smoothProgress, v => (v > 0.2 && v < 0.7) ? 20 : 0),
            pointerEvents: useTransform(smoothProgress, v => (v > 0.25 && v < 0.65) ? 'auto' : 'none'),
          }}
        >
          <div style={{
            textAlign: 'center',
            maxWidth: 820,
            padding: '56px 60px',
            background: 'rgba(245, 242, 236, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 32,
            border: '1px solid rgba(214, 191, 167, 0.35)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'var(--accent-copper)',
              marginBottom: 24,
              textTransform: 'uppercase',
            }}>
              Intelligence Activating
            </p>
            <h2 className="text-display" style={{ color: 'var(--text-primary)', lineHeight: 1.05 }}>
              Every movement
              <br />
              <span className="gradient-text">measured.</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              marginTop: 24,
              lineHeight: 1.7,
              fontWeight: 400,
            }}>
              Every action understood. AISANCE reads between the lines of every journey.
            </p>
          </div>
        </motion.div>

        {/* Narrative 3 — OPTIMIZATION */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: opacity3,
            zIndex: useTransform(smoothProgress, v => v > 0.7 ? 30 : 0),
            pointerEvents: useTransform(smoothProgress, v => v > 0.75 ? 'auto' : 'none'),
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 800, padding: '0 40px' }}>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'var(--accent-copper)',
              marginBottom: 32,
            }}>
              OPTIMIZED PERFORMANCE
            </p>
            <h2 className="text-display" style={{ color: 'var(--text-primary)', lineHeight: 1.05 }}>
              Smoother rides.
              <br />
              <span className="gradient-text">By design.</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              marginTop: 24,
              lineHeight: 1.7,
            }}>
              Precision-engineered insights that make every journey feel intentional.
            </p>
            <div style={{ marginTop: 40 }}>
              <a href="#problem" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', background: 'linear-gradient(135deg, #C8A882, #B87333)', color: '#fff', borderRadius: 9999, fontWeight: 600, fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(184,115,51,0.3)' }}>
                Explore Platform ↓
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
