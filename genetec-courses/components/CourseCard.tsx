"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.a
      href="#"
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      {/* Product Icon */}
      <div className="mb-4">
        <Image
          src={`/icons/${course.icon}`}
          alt={course.productLine}
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium mb-3 line-clamp-2">
        {course.title}
      </h3>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {course.certification === "Yes" && (
          <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: '#E6F7FD', color: '#3DC1F3' }}>
            Certification
          </span>
        )}
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
          {course.level}
        </span>
      </div>

      {/* Languages */}
      <div className="flex gap-2 text-sm text-gray-600">
        {course.languages.map(lang => {
          const code = lang === 'English' ? 'EN' : lang === 'French' ? 'FR' : 'ES';
          return <span key={lang}>{code}</span>;
        })}
      </div>
    </motion.a>
  );
}
