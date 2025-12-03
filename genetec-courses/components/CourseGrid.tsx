"use client";
import { CourseCard } from './CourseCard';
import type { Course } from '@/lib/types';

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={course.code} course={course} index={index} />
      ))}
    </div>
  );
}
