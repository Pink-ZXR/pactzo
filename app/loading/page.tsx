'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/result');
    }, 3500);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#F6F5F2] flex flex-col justify-center items-center relative overflow-hidden">
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
        className="absolute top-6 left-6 md:left-12 z-10"
      >
        <Link
          href="/"
          className="text-[9px] tracking-[0.3em] uppercase text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors duration-500"
          style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
        >
          百澤
        </Link>
      </motion.div>

      {/* Center: The Pulse */}
      <div className="relative flex flex-col items-center">
        {/* Single pulsing circle */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.15, 1, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r="89"
              fill="none"
              stroke="#7A2E2E"
              strokeWidth="0.8"
            />
          </svg>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 text-[9px] tracking-[0.35em] text-[#1A1A1A]/30"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Sensing your rhythm...
        </motion.p>
      </div>
    </main>
  );
}
