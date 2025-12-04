"use client";
import { motion } from 'framer-motion';
import { CourseGrid } from './CourseGrid';
import type { Course } from '@/lib/types';

interface ProductRowProps {
  productLine: string;
  courses: Course[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function ProductRow({ productLine, courses, isExpanded, onToggle }: ProductRowProps) {
  // Calculate audience counts
  const counts = {
    operator: courses.filter(c => c.audience === 'Operator').length,
    administrator: courses.filter(c => c.audience === 'Administrator').length,
    powerUser: courses.filter(c => c.audience === 'Power user').length,
  };

  const renderBadge = (count: number, color: string) => {
    if (count === 0) {
      return <span className="text-gray-400">-</span>;
    }
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
        style={{ backgroundColor: color }}
      >
        {count}
      </div>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      {/* Header Row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        {/* Chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Desktop Layout (4 columns) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 flex-1 items-center text-left">
          <div className="font-medium text-gray-900">
            {productLine} <span className="text-gray-500">({courses.length})</span>
          </div>
          <div className="flex justify-center">
            {renderBadge(counts.operator, '#10B981')}
          </div>
          <div className="flex justify-center">
            {renderBadge(counts.administrator, '#F59E0B')}
          </div>
          <div className="flex justify-center">
            {renderBadge(counts.powerUser, '#8B5CF6')}
          </div>
        </div>

        {/* Tablet/Mobile Layout */}
        <div className="lg:hidden flex-1">
          <div className="font-medium text-gray-900 mb-2">
            {productLine} <span className="text-gray-500">({courses.length})</span>
          </div>
          <div className="flex gap-3 items-center">
            <div className="text-xs text-gray-600">Operator:</div>
            {renderBadge(counts.operator, '#10B981')}
            <div className="text-xs text-gray-600">Admin:</div>
            {renderBadge(counts.administrator, '#F59E0B')}
            <div className="text-xs text-gray-600">Power:</div>
            {renderBadge(counts.powerUser, '#8B5CF6')}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <CourseGrid courses={courses} />
        </div>
      </motion.div>
    </div>
  );
}
