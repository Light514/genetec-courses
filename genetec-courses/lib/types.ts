export interface Course {
  code: string;
  title: string;
  certification: "Yes" | "No";
  deliveryType: string;
  level: string;
  audience: string;
  productLine: string;
  productCategory: string;
  languages: string[];  // Parsed from comma-separated
  icon: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterCategory {
  label: string;
  options: FilterOption[];
}

export interface FiltersData {
  deliveryType: FilterCategory;
  certification: FilterCategory;
  audience: FilterCategory;
  productCategory: FilterCategory;
  productLine: FilterCategory;
  level: FilterCategory;
  languages: FilterCategory;
}

export interface FilterState {
  deliveryType: string[];
  certification: string[];
  audience: string[];
  productCategory: string[];
  productLine: string[];
  level: string[];
  languages: string[];
}
