"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SortOption, SortOrder } from '@/lib/sortCourses';

interface SortBarProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void;
}

export function SortBar({ sortBy, sortOrder, onSortChange }: SortBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'none', label: 'Default' },
    { value: 'title', label: 'Title' },
    { value: 'level', label: 'Level' },
    { value: 'certification', label: 'Certification' },
  ];

  const handleSortChange = (newSortBy: SortOption) => {
    onSortChange(newSortBy, sortOrder);
    setIsOpen(false);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Default';

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>

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
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10 min-w-[200px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="space-y-1">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors ${
                      sortBy === option.value
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={sortBy === option.value ? { backgroundColor: '#3DC1F3' } : {}}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {sortBy !== 'none' && (
        <button
          onClick={toggleSortOrder}
          className="px-3 py-2 text-white rounded-md cursor-pointer hover:brightness-110 transition-all duration-200"
          style={{ backgroundColor: '#2C3239' }}
          title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      )}
    </div>
  );
}
