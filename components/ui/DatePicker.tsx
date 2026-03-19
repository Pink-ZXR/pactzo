'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 十二时辰定义
const SHI_CHEN = [
  { value: 0, label: '子时', time: '23:00-01:00', desc: '夜半' },
  { value: 1, label: '丑时', time: '01:00-03:00', desc: '鸡鸣' },
  { value: 2, label: '寅时', time: '03:00-05:00', desc: '平旦' },
  { value: 3, label: '卯时', time: '05:00-07:00', desc: '日出' },
  { value: 4, label: '辰时', time: '07:00-09:00', desc: '食时' },
  { value: 5, label: '巳时', time: '09:00-11:00', desc: '隅中' },
  { value: 6, label: '午时', time: '11:00-13:00', desc: '日中' },
  { value: 7, label: '未时', time: '13:00-15:00', desc: '日昳' },
  { value: 8, label: '申时', time: '15:00-17:00', desc: '晡时' },
  { value: 9, label: '酉时', time: '17:00-19:00', desc: '日入' },
  { value: 10, label: '戌时', time: '19:00-21:00', desc: '黄昏' },
  { value: 11, label: '亥时', time: '21:00-23:00', desc: '人定' },
];

interface DatePickerProps {
  value?: { year: number; month: number; day: number; hour?: number };
  onChange: (date: { year: number; month: number; day: number; hour?: number }) => void;
  className?: string;
  showHour?: boolean;
}

export function DatePicker({ value, onChange, className = '', showHour = true }: DatePickerProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  const [selectedYear, setSelectedYear] = useState(value?.year || 1990);
  const [selectedMonth, setSelectedMonth] = useState(value?.month || 1);
  const [selectedDay, setSelectedDay] = useState(value?.day || 1);
  const [selectedHour, setSelectedHour] = useState<number | undefined>(value?.hour);
  const [isNow, setIsNow] = useState(false);
  
  // 计算当月天数
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // 如果当前选中的日期超过了当月天数，自动调整
  useEffect(() => {
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  }, [selectedMonth, selectedYear, daysInMonth, selectedDay]);
  
  // 当日期改变时通知父组件
  useEffect(() => {
    onChange({ 
      year: selectedYear, 
      month: selectedMonth, 
      day: selectedDay,
      hour: selectedHour 
    });
  }, [selectedYear, selectedMonth, selectedDay, selectedHour, onChange]);
  
  // 获取当前时辰
  const getCurrentShiChen = () => {
    const now = new Date();
    const hour = now.getHours();
    // 将24小时制转换为十二时辰
    if (hour >= 23 || hour < 1) return 0; // 子时
    if (hour >= 1 && hour < 3) return 1;  // 丑时
    if (hour >= 3 && hour < 5) return 2;  // 寅时
    if (hour >= 5 && hour < 7) return 3;  // 卯时
    if (hour >= 7 && hour < 9) return 4;  // 辰时
    if (hour >= 9 && hour < 11) return 5; // 巳时
    if (hour >= 11 && hour < 13) return 6; // 午时
    if (hour >= 13 && hour < 15) return 7; // 未时
    if (hour >= 15 && hour < 17) return 8; // 申时
    if (hour >= 17 && hour < 19) return 9; // 酉时
    if (hour >= 19 && hour < 21) return 10; // 戌时
    return 11; // 亥时
  };
  
  // 设置此刻
  const handleSetNow = () => {
    const now = new Date();
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth() + 1);
    setSelectedDay(now.getDate());
    setSelectedHour(getCurrentShiChen());
    setIsNow(true);
  };
  
  // 清除此刻标记当用户手动修改时
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setIsNow(false);
  };
  
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setIsNow(false);
  };
  
  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    setIsNow(false);
  };
  
  const handleHourChange = (hour: number | undefined) => {
    setSelectedHour(hour);
    setIsNow(false);
  };
  
  const selectStyles = `
    appearance-none bg-cream border-2 border-sand rounded-xl px-4 py-3 
    text-foreground text-center font-medium cursor-pointer
    focus:outline-none focus:border-primary-light focus:ring-2 focus:ring-primary/10
    transition-all duration-200
    hover:border-primary-light
  `;
  
  const nowButtonStyles = isNow 
    ? 'bg-accent/10 border-accent text-accent' 
    : 'bg-cream border-sand text-text-secondary hover:border-primary-light hover:text-primary';
  
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* 年月日选择 */}
      <div className="flex gap-3 justify-center flex-wrap">
        {/* 年份选择 */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className={selectStyles}
            style={{ minWidth: '100px' }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ))}
          </select>
        </motion.div>
        
        {/* 月份选择 */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className={selectStyles}
            style={{ minWidth: '80px' }}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}月
              </option>
            ))}
          </select>
        </motion.div>
        
        {/* 日期选择 */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <select
            value={selectedDay}
            onChange={(e) => handleDayChange(Number(e.target.value))}
            className={selectStyles}
            style={{ minWidth: '80px' }}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}日
              </option>
            ))}
          </select>
        </motion.div>
        
        {/* 时辰选择 */}
        {showHour && (
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <select
              value={selectedHour ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'now') {
                  handleSetNow();
                } else {
                  handleHourChange(value ? Number(value) : undefined);
                }
              }}
              className={selectStyles}
              style={{ minWidth: '140px' }}
            >
              <option value="">时间 (可选)</option>
              <option value="now">✦ 此刻</option>
              {SHI_CHEN.map((shi) => (
                <option key={shi.value} value={shi.value}>
                  {shi.time}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </div>
      
      {/* 日期显示 */}
      <p className="text-center text-text-secondary text-sm">
        {selectedYear}年{selectedMonth}月{selectedDay}日
        {selectedHour !== undefined && (
          <span className="text-primary ml-1">
            · {SHI_CHEN[selectedHour].time}
          </span>
        )}
      </p>
    </div>
  );
}
