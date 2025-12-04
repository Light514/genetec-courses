"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { ViewSwitcher } from '@/components/ViewSwitcher';
import { SortBar } from '@/components/SortBar';
import { CourseGrid } from '@/components/CourseGrid';
import { CourseList } from '@/components/CourseList';
import { CourseMatrix } from '@/components/CourseMatrix';
import { LoadMoreButton } from '@/components/LoadMoreButton';
import { parseCourses } from '@/lib/parseCourses';
import { parseFilters } from '@/lib/parseFilters';
import { filterCourses } from '@/lib/filterCourses';
import { sortCourses, type SortOption, type SortOrder } from '@/lib/sortCourses';
import type { Course, FiltersData, FilterState, ViewMode } from '@/lib/types';

export default function HomePage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [filterOptions, setFilterOptions] = useState<FiltersData | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    deliveryType: [],
    certification: [],
    audience: [],
    productCategory: [],
    productLine: [],
    level: [],
    languages: []
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  // Load data
  useEffect(() => {
    Promise.all([parseCourses(), parseFilters()])
      .then(([courses, filters]) => {
        setAllCourses(courses);
        setFilterOptions(filters);
      });
  }, []);

  // Filter, search, and sort
  const filteredCourses = useMemo(() => {
    const filtered = filterCourses(allCourses, filters, searchQuery);
    return sortCourses(filtered, sortBy, sortOrder);
  }, [allCourses, filters, searchQuery, sortBy, sortOrder]);

  const visibleCourses = useMemo(() =>
    filteredCourses.slice(0, visibleCount),
    [filteredCourses, visibleCount]
  );

  const handleFilterChange = (key: keyof FilterState, values: string[]) => {
    setFilters(prev => ({ ...prev, [key]: values }));
    setVisibleCount(12); // Reset pagination
  };

  const handleSortChange = (newSortBy: SortOption, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  if (!filterOptions) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-white py-12 px-4" style={{ backgroundColor: '#2C3239' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-garamond), serif' }}>Training courses</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* View Switcher and Search */}
        <div className="flex justify-end items-center gap-4 mb-6">
          <ViewSwitcher value={viewMode} onChange={setViewMode} />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
        />

        {/* Sort Controls */}
        <SortBar
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {visibleCourses.length} of {filteredCourses.length} courses
        </div>

        {/* View Modes */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CourseGrid courses={visibleCourses} />
            </motion.div>
          )}
          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CourseList courses={visibleCourses} />
            </motion.div>
          )}
          {viewMode === 'matrix' && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CourseMatrix
                courses={filteredCourses}
                expandedProducts={expandedProducts}
                onToggleProduct={(product) => {
                  setExpandedProducts(prev => {
                    const next = new Set(prev);
                    next.has(product) ? next.delete(product) : next.add(product);
                    return next;
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {viewMode !== 'matrix' && (
          <LoadMoreButton
            onClick={handleLoadMore}
            hasMore={visibleCount < filteredCourses.length}
          />
        )}
      </main>
    </div>
  );
}
