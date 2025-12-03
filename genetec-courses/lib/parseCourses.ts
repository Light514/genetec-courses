import Papa from 'papaparse';
import type { Course } from './types';

export async function parseCourses(): Promise<Course[]> {
  const response = await fetch('/data/LIST_PAGE_metadata.csv');
  const csvText = await response.text();

  const result = Papa.parse<any>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  // Filter out malformed rows (missing icon)
  const courses: Course[] = result.data
    .filter((row: any) => row.Icon && row.Icon.trim() !== '')
    .map((row: any) => ({
      code: row.Code || '',
      title: row.Title || '',
      certification: row.Certification as "Yes" | "No",
      deliveryType: row['Delivery type'] || '',
      level: row.Level || '',
      audience: row.Audience || '',
      productLine: row['Product line'] || '',
      productCategory: row['Product Category'] || '',
      languages: row['Languages available']
        .split(',')
        .map((lang: string) => lang.trim()),
      icon: row.Icon || '',
    }));

  return courses;
}
