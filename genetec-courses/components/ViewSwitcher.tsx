"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ViewMode } from '@/lib/types';

interface ViewSwitcherProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and auto-switch from List to Grid
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(mobile);

      // Auto-switch from List to Grid on mobile
      if (mobile && value === 'list') {
        onChange('grid');
      }
    };

    checkMobile();

    // Listen for resize
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    mediaQuery.addEventListener('change', checkMobile);

    return () => mediaQuery.removeEventListener('change', checkMobile);
  }, [value, onChange]);

  const viewOptions: { value: ViewMode; label: string }[] = [
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
    { value: 'matrix', label: 'Matrix' },
  ];

  // Filter out List option on mobile
  const availableOptions = isMobile
    ? viewOptions.filter(opt => opt.value !== 'list')
    : viewOptions;

  const handleViewChange = (newView: ViewMode) => {
    onChange(newView);
    setIsOpen(false);
  };

  const currentLabel = viewOptions.find(opt => opt.value === value)?.label || 'Grid';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-white rounded-md flex items-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200"
        style={{ backgroundColor: '#2C3239' }}
      >
        {currentLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10 min-w-[150px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="space-y-1">
              {availableOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleViewChange(option.value)}
                  className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                    value === option.value
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={value === option.value ? { backgroundColor: '#3DC1F3' } : {}}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
