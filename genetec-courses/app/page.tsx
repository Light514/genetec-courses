"use client";
import { useState, useEffect, useMemo } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { SortBar } from '@/components/SortBar';
import { CourseGrid } from '@/components/CourseGrid';
import { LoadMoreButton } from '@/components/LoadMoreButton';
import { parseCourses } from '@/lib/parseCourses';
import { parseFilters } from '@/lib/parseFilters';
import { filterCourses } from '@/lib/filterCourses';
import { sortCourses, type SortOption, type SortOrder } from '@/lib/sortCourses';
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
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

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
