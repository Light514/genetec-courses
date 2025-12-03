"use client";
import { motion, AnimatePresence } from 'framer-motion';
import type { FilterOption } from '@/lib/types';

interface FilterDropdownProps {
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  isOpen: boolean;
}

export function FilterDropdown({ options, selected, onChange, isOpen }: FilterDropdownProps) {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 min-w-[250px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {options.map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                  className="rounded"
                />
                <span className="flex-1">{option.label}</span>
                <span className="text-sm text-gray-500">({option.count})</span>
              </label>
            ))}
          </div>

          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              Clear all
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
