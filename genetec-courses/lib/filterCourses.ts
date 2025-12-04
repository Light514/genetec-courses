import type { Course, FilterState } from './types';

export function filterCourses(
  courses: Course[],
  filters: FilterState,
  searchQuery: string
): Course[] {
  let result = courses;

  // Apply search (by title or code)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    result = result.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query)
    );
  }

  // Apply filters (AND logic across categories)
  Object.entries(filters).forEach(([key, values]) => {
    if (values.length === 0) return;

    result = result.filter(course => {
      switch (key) {
        case 'deliveryType':
          // INCLUDES logic: course must have at least one selected delivery type
          return values.some((type: string) => course.deliveryType.includes(type));
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
