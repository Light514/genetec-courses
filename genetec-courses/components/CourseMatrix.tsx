"use client";
import { ProductRow } from './ProductRow';
import type { Course } from '@/lib/types';

interface CourseMatrixProps {
  courses: Course[];
  expandedProducts: Set<string>;
  onToggleProduct: (productLine: string) => void;
}

export function CourseMatrix({ courses, expandedProducts, onToggleProduct }: CourseMatrixProps) {
  // Group courses by product line
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc.has(course.productLine)) {
      acc.set(course.productLine, []);
    }
    acc.get(course.productLine)!.push(course);
    return acc;
  }, new Map<string, Course[]>());

  // Convert to array and sort by product line name
  const productGroups = Array.from(groupedCourses.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  if (productGroups.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No courses match your filters. Try adjusting your selection.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Row - Desktop Only */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4 px-4 py-3 bg-gray-100 rounded-lg font-medium text-gray-700 text-sm">
        <div>Product</div>
        <div className="text-center">Operator</div>
        <div className="text-center">Administrator</div>
        <div className="text-center">Power User</div>
      </div>

      {/* Product Rows */}
      {productGroups.map(([productLine, productCourses]) => (
        <ProductRow
          key={productLine}
          productLine={productLine}
          courses={productCourses}
          isExpanded={expandedProducts.has(productLine)}
          onToggle={() => onToggleProduct(productLine)}
        />
      ))}
    </div>
  );
}
