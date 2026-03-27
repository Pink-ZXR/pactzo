'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/* ─── Constants ─── */
const TRANSITION = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

const YEARS = Array.from({ length: 96 }, (_, i) => String(2025 - i));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const TIME_SLOTS = [
  { value: 'now', label: '✦ 吉时' },
  { value: '23:00-01:00', label: '23:00 – 01:00' },
  { value: '01:00-03:00', label: '01:00 – 03:00' },
  { value: '03:00-05:00', label: '03:00 – 05:00' },
  { value: '05:00-07:00', label: '05:00 – 07:00' },
  { value: '07:00-09:00', label: '07:00 – 09:00' },
  { value: '09:00-11:00', label: '09:00 – 11:00' },
  { value: '11:00-13:00', label: '11:00 – 13:00' },
  { value: '13:00-15:00', label: '13:00 – 15:00' },
  { value: '15:00-17:00', label: '15:00 – 17:00' },
  { value: '17:00-19:00', label: '17:00 – 19:00' },
  { value: '19:00-21:00', label: '19:00 – 21:00' },
  { value: '21:00-23:00', label: '21:00 – 23:00' },
  { value: 'unknown', label: '不确定' },
];

/* ─── Custom Editorial Select ─── */
interface EditorialSelectProps {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  isFocused: boolean;
  dimmed: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (val: string) => void;
  large?: boolean;
}

function EditorialSelect({
  label, placeholder, value, options, isFocused, dimmed,
  onOpen, onClose, onSelect, large = true,
}: EditorialSelectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isFocused) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isFocused, onClose]);

  // Scroll to selected on open
  useEffect(() => {
    if (isFocused && listRef.current && value) {
      const el = listRef.current.querySelector(`[data-value="${value}"]`);
      if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }, [isFocused, value]);

  const displayVal = value
    ? options.find(o => o.value === value)?.label ?? value
    : '';

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: dimmed ? 0.15 : 1 }}
      transition={TRANSITION}
      className="relative flex-1"
    >
      {/* Label */}
      <span className="font-inter-label block text-[9px] opacity-40 mb-4 md:mb-6">
        {label}
      </span>

      {/* Trigger */}
      <button
        onClick={() => isFocused ? onClose() : onOpen()}
        className="w-full flex items-end justify-between gap-2 text-left group"
      >
        <span
          className={`font-playfair transition-colors duration-500 leading-none ${
            large
              ? 'text-[clamp(32px,5vw,56px)]'
              : 'text-lg md:text-xl'
          } ${
            value
              ? 'text-[#1A1A1A]'
              : 'text-[#1A1A1A]/20'
          }`}
        >
          {displayVal || placeholder}
        </span>

        {/* Down arrow – 0.5px stroke */}
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          className={`mb-2 shrink-0 transition-transform duration-500 ${isFocused ? 'rotate-180' : ''}`}
        >
          <path d="M2 3.5L5 7L8 3.5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-[#1A1A1A]/30 group-hover:text-[#7A2E2E] transition-colors"
          />
        </svg>
      </button>

      {/* Underline – expands from center on focus */}
      <div className="relative h-[1px] mt-3 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          animate={{
            width: isFocused ? '100%' : '0%',
            left: isFocused ? '0%' : '50%',
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 h-full bg-[#7A2E2E]"
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full mt-3 z-50"
          >
            <div
              ref={listRef}
              className="bg-[#F6F5F2] border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.08)] max-h-[240px] overflow-y-auto rounded-sm"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  data-value={opt.value}
                  onClick={() => { onSelect(opt.value); onClose(); }}
                  className={`w-full text-left px-5 py-3 font-inter text-sm tracking-wide transition-all duration-200
                    ${value === opt.value
                      ? 'text-[#7A2E2E] bg-[#7A2E2E]/[0.04] font-medium'
                      : 'text-[#1A1A1A]/60 hover:text-[#7A2E2E] hover:bg-[#7A2E2E]/[0.03] hover:pl-7'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function BirthdayPage() {
  const router = useRouter();
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [openField, setOpenField] = useState<string | null>(null);

  const yearNum = parseInt(year);
  const monthNum = parseInt(month);
  const dayNum = parseInt(day);
  const isDateComplete = year.length === 4 && yearNum >= 1930 && yearNum <= 2025
    && monthNum >= 1 && monthNum <= 12
    && dayNum >= 1 && dayNum <= 31;

  const handleNext = useCallback(() => {
    if (!isDateComplete) return;
    let resolvedTime: string | null = null;
    if (time === 'now') {
      const now = new Date();
      resolvedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    } else if (time && time !== 'unknown') {
      resolvedTime = time;
    }
    sessionStorage.setItem('birthdate', JSON.stringify({
      year: yearNum, month: monthNum, day: dayNum, time: resolvedTime,
    }));
    router.push('/questionnaire/tianshi');
  }, [isDateComplete, time, yearNum, monthNum, dayNum, router]);

  const yearOpts = YEARS.map(y => ({ value: y, label: y }));
  const monthOpts = MONTHS.map(m => ({ value: m, label: m }));
  const dayOpts = DAYS.map(d => ({ value: d, label: d }));

  const handleOpen = useCallback((field: string) => setOpenField(field), []);
  const handleClose = useCallback(() => setOpenField(null), []);

  return (
    <div className="relative h-screen w-full bg-[#F6F5F2] text-[#1A1A1A] overflow-hidden selection:bg-[#7A2E2E]/10">
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F6F5F2]/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="font-inter-label text-[9px] opacity-50 hover:opacity-100 hover:text-[#7A2E2E] transition-all duration-300">
            百澤
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <footer className="fixed bottom-10 left-10 right-10 md:bottom-12 md:left-12 md:right-12 z-40 flex justify-between items-end">
        <Link
          href="/"
          className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-all duration-300"
        >
          ← Back
        </Link>
        <button
          onClick={handleNext}
          disabled={!isDateComplete}
          className="group flex items-center gap-4 transition-all duration-500 disabled:opacity-10 disabled:pointer-events-none"
        >
          <span className="font-inter text-[10px] tracking-[0.4em] uppercase font-semibold opacity-50 group-hover:opacity-100 group-hover:text-[#7A2E2E] transition-all">
            Continue
          </span>
          <motion.span
            animate={{ x: isDateComplete ? 0 : -4, opacity: isDateComplete ? 0.5 : 0 }}
            transition={TRANSITION}
            className="text-xl font-thin group-hover:translate-x-2 group-hover:opacity-100 group-hover:text-[#7A2E2E] transition-all duration-300"
          >
            →
          </motion.span>
        </button>
      </footer>

      {/* Main */}
      <div className="h-full flex flex-col justify-center px-6 md:px-[10%] lg:px-[14%]">
        <div className="w-full max-w-5xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay: 0.1 }}
            className="mb-16 md:mb-24"
          >
            <span className="font-inter-label block text-[9px] opacity-30 mb-6">
              Archive — Birth Date
            </span>
            <h1 className="font-playfair text-[clamp(48px,8vw,96px)] leading-[0.85] tracking-tighter mb-4">
              Birth<br />Date.
            </h1>
            <p className="font-inter text-[10px] md:text-xs tracking-[0.35em] opacity-30 uppercase mt-6 font-light">
              你是什么时候来到这个世界的
            </p>
          </motion.div>

          {/* Selectors Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay: 0.3 }}
            className="flex items-start gap-0 mb-14 md:mb-20"
          >
            <EditorialSelect
              label="YEAR"
              placeholder="—"
              value={year}
              options={yearOpts}
              isFocused={openField === 'year'}
              dimmed={!!openField && openField !== 'year'}
              onOpen={() => handleOpen('year')}
              onClose={handleClose}
              onSelect={setYear}
            />

            {/* Separator */}
            <div className="w-[0.5px] h-16 md:h-20 bg-black/[0.06] mx-6 md:mx-10 mt-8 shrink-0" />

            <EditorialSelect
              label="MONTH"
              placeholder="—"
              value={month}
              options={monthOpts}
              isFocused={openField === 'month'}
              dimmed={!!openField && openField !== 'month'}
              onOpen={() => handleOpen('month')}
              onClose={handleClose}
              onSelect={setMonth}
            />

            {/* Separator */}
            <div className="w-[0.5px] h-16 md:h-20 bg-black/[0.06] mx-6 md:mx-10 mt-8 shrink-0" />

            <EditorialSelect
              label="DAY"
              placeholder="—"
              value={day}
              options={dayOpts}
              isFocused={openField === 'day'}
              dimmed={!!openField && openField !== 'day'}
              onOpen={() => handleOpen('day')}
              onClose={handleClose}
              onSelect={setDay}
            />
          </motion.div>

          {/* Time (optional, smaller) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...TRANSITION, delay: 0.5 }}
            className="max-w-xs"
          >
            <EditorialSelect
              label="TIME (OPTIONAL)"
              placeholder="不确定"
              value={time}
              options={TIME_SLOTS}
              isFocused={openField === 'time'}
              dimmed={!!openField && openField !== 'time'}
              onOpen={() => handleOpen('time')}
              onClose={handleClose}
              onSelect={setTime}
              large={false}
            />
          </motion.div>
        </div>
      </div>

      {/* Faint side text */}
      <div className="hidden md:block absolute right-5 top-1/2 -translate-y-1/2 writing-mode-vertical font-inter text-[7px] tracking-[0.6em] uppercase opacity-[0.06] pointer-events-none select-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        PACTZO_ARCHIVE_2026
      </div>
    </div>
  );
}
