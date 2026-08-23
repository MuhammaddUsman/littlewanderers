export const REGIONS = ['Asia', 'Europe', 'Americas', 'Middle East'] as const

export const TRIP_TYPES = [
  'Beach Holidays',
  'City Breaks',
  'Adventure',
  'Budget-Friendly',
  'All-Inclusive',
] as const

export type Region = (typeof REGIONS)[number]
export type TripType = (typeof TRIP_TYPES)[number]

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function unslugify(slug: string, options: ReadonlyArray<string>) {
  return options.find((option) => slugify(option) === slug)
}
