import Papa from 'papaparse';
import type { Course } from './types';

export async function parseCourses(): Promise<Course[]> {
  // First, parse delivery types CSV to build a map
  const deliveryTypesResponse = await fetch('/data/courses_delivery_types.csv');
  const deliveryTypesText = await deliveryTypesResponse.text();

  const deliveryTypesResult = Papa.parse<any>(deliveryTypesText, {
    header: true,
    skipEmptyLines: true,
  });

  // Build map of course title -> delivery types array
  const deliveryTypesMap = new Map<string, string[]>();
  deliveryTypesResult.data.forEach((row: any) => {
    const title = row['Course Title']?.trim();
    const deliveryType = row['Delivery Type']?.trim();

    if (title && deliveryType) {
      if (!deliveryTypesMap.has(title)) {
        deliveryTypesMap.set(title, []);
      }
      deliveryTypesMap.get(title)!.push(deliveryType);
    }
  });

  // Now parse main courses CSV
  const response = await fetch('/data/LIST_PAGE_metadata.csv');
  const csvText = await response.text();

  const result = Papa.parse<any>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  // Filter out malformed rows (missing icon)
  const courses: Course[] = result.data
    .filter((row: any) => row.Icon && row.Icon.trim() !== '')
    .map((row: any) => {
      const title = (row.Title || '').trim();
      return {
        code: (row.Code || '').trim(),
        title,
        certification: row.Certification as "Yes" | "No",
        deliveryType: deliveryTypesMap.get(title) || [],
        level: row.Level || '',
        audience: row.Audience || '',
        productLine: row['Product line'] || '',
        productCategory: row['Product Category'] || '',
        languages: row['Languages available']
          .split(',')
          .map((lang: string) => lang.trim()),
        icon: row.Icon || '',
      };
    });

  return courses;
}
