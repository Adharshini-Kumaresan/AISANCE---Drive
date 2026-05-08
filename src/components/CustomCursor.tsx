'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }

      requestAnimationFrame(animate);
    };

    const handleMouseEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.borderColor = 'var(--accent-copper)';
        ringRef.current.style.opacity = '0.7';
      }
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const handleMouseLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'var(--accent-gold)';
        ringRef.current.style.opacity = '1';
      }
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    const links = document.querySelectorAll('a, button, [data-cursor="hover"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="custom-cursor" style={{ pointerEvents: 'none', zIndex: 10000 }}>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          background: 'var(--accent-copper)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          border: '1.5px solid var(--accent-gold)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
