"use client";
import { useState, useEffect, useMemo } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { CourseGrid } from '@/components/CourseGrid';
import { LoadMoreButton } from '@/components/LoadMoreButton';
import { parseCourses } from '@/lib/parseCourses';
import { parseFilters } from '@/lib/parseFilters';
import { filterCourses } from '@/lib/filterCourses';
import type { Course, FiltersData, FilterState } from '@/lib/types';

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

  // Load data
  useEffect(() => {
    Promise.all([parseCourses(), parseFilters()])
      .then(([courses, filters]) => {
        setAllCourses(courses);
        setFilterOptions(filters);
      });
  }, []);

  // Filter and search
  const filteredCourses = useMemo(() =>
    filterCourses(allCourses, filters, searchQuery),
    [allCourses, filters, searchQuery]
  );

  const visibleCourses = useMemo(() =>
    filteredCourses.slice(0, visibleCount),
    [filteredCourses, visibleCount]
  );

  const handleFilterChange = (key: keyof FilterState, values: string[]) => {
    setFilters(prev => ({ ...prev, [key]: values }));
    setVisibleCount(12); // Reset pagination
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  if (!filterOptions) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-garamond), serif' }}>Training courses</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="flex justify-end mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
        />

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {visibleCourses.length} of {filteredCourses.length} courses
        </div>

        {/* Grid */}
        <CourseGrid courses={visibleCourses} />

        {/* Load More */}
        <LoadMoreButton
          onClick={handleLoadMore}
          hasMore={visibleCount < filteredCourses.length}
        />
      </main>
    </div>
  );
}
