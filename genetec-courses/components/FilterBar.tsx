"use client";
import { useState } from 'react';
import { FilterDropdown } from './FilterDropdown';
import type { FiltersData, FilterState } from '@/lib/types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, values: string[]) => void;
  filterOptions: FiltersData;
}

export function FilterBar({ filters, onFilterChange, filterOptions }: FilterBarProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const filterKeys: (keyof FilterState)[] = [
    'deliveryType', 'certification', 'audience',
    'productCategory', 'productLine', 'level', 'languages'
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filterKeys.map(key => {
        const category = filterOptions[key];
        const selectedCount = filters[key].length;

        return (
          <div key={key} className="relative">
            <button
              onClick={() => setOpenFilter(openFilter === key ? null : key)}
              className="px-4 py-2 text-white rounded-md flex items-center gap-2 cursor-pointer hover:brightness-110 transition-all duration-200"
              style={{ backgroundColor: '#2C3239' }}
            >
              {category.label}
              {selectedCount > 0 && (
                <span className="text-white text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#3DC1F3' }}>
                  {selectedCount}
                </span>
              )}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <FilterDropdown
              options={category.options}
              selected={filters[key]}
              onChange={(values) => onFilterChange(key, values)}
              isOpen={openFilter === key}
            />
          </div>
        );
      })}
    </div>
  );
}
