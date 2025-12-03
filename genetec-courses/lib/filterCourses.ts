import type { Course, FilterState } from './types';

export function filterCourses(
  courses: Course[],
  filters: FilterState,
  searchQuery: string
): Course[] {
  let result = courses;

  // Apply search (by title)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    result = result.filter(course =>
      course.title.toLowerCase().includes(query)
    );
  }

  // Apply filters (AND logic across categories)
  Object.entries(filters).forEach(([key, values]) => {
    if (values.length === 0) return;

    result = result.filter(course => {
      switch (key) {
        case 'deliveryType':
          return values.includes(course.deliveryType);
        case 'certification':
          return values.includes(course.certification);
        case 'audience':
          return values.includes(course.audience);
        case 'productCategory':
          return values.includes(course.productCategory);
        case 'productLine':
          return values.includes(course.productLine);
        case 'level':
          return values.includes(course.level);
        case 'languages':
          // INCLUDES logic: course must have at least one selected language
          return values.some((lang: string) => course.languages.includes(lang));
        default:
          return true;
      }
    });
  });

  return result;
}
