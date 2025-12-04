"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Course } from '@/lib/types';

interface CourseListProps {
  courses: Course[];
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <div className="space-y-3">
      {courses.map((course, index) => (
        <motion.a
          key={course.code}
          href="#"
          className="flex items-center gap-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          whileHover={{ y: -2 }}
        >
          {/* Product Icon */}
          <div className="flex-shrink-0">
            <Image
              src={`/icons/${course.icon}`}
              alt={course.productLine}
              width={80}
              height={32}
              className="h-8 w-auto"
            />
          </div>

          {/* Course Code */}
          <div className="text-xs text-gray-500 uppercase w-24 flex-shrink-0">
            {course.code}
          </div>

          {/* Title */}
          <h3 className="text-base font-medium flex-1 min-w-0">
            {course.title}
          </h3>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {course.certification === "Yes" && (
              <span className="px-2 py-1 text-xs rounded text-white" style={{ backgroundColor: '#005197' }}>
                Certification
              </span>
            )}
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {course.level}
            </span>
          </div>

          {/* Languages */}
          <div className="flex gap-2 text-sm text-gray-600 flex-shrink-0">
            {course.languages.map(lang => {
              const code = lang === 'English' ? 'EN' : lang === 'French' ? 'FR' : 'ES';
              return <span key={lang}>{code}</span>;
            })}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
