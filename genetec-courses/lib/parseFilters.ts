import type { FiltersData } from './types';

export async function parseFilters(): Promise<FiltersData> {
  const response = await fetch('/data/FILTERS.json');
  return response.json();
}
