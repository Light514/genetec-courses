import type { Course } from './types';

export type SortOption = 'none' | 'title' | 'level' | 'certification';
export type SortOrder = 'asc' | 'desc';

const levelOrder: Record<string, number> = {
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
  'Expert': 4
};

export function sortCourses(
  courses: Course[],
  sortBy: SortOption,
  sortOrder: SortOrder
): Course[] {
  if (sortBy === 'none') {
    return courses;
  }

  const sorted = [...courses].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = a.title.trim().localeCompare(b.title.trim());
        break;

      case 'level':
        const aLevel = levelOrder[a.level] || 0;
        const bLevel = levelOrder[b.level] || 0;
        comparison = aLevel - bLevel;
        break;

      case 'certification':
        // "Yes" should come before "No" when ascending
        const aCert = a.certification === 'Yes' ? 1 : 0;
        const bCert = b.certification === 'Yes' ? 1 : 0;
        comparison = bCert - aCert; // Reverse for Yes first
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
}
