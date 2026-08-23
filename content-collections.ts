import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const REGIONS = ['Asia', 'Europe', 'Americas', 'Middle East'] as const
const TRIP_TYPES = [
  'Beach Holidays',
  'City Breaks',
  'Adventure',
  'Budget-Friendly',
  'All-Inclusive',
] as const

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    country: z.string(),
    city: z.string(),
    summary: z.string(),
    region: z.enum(REGIONS),
    tripTypes: z.array(z.enum(TRIP_TYPES)),
    slug: z.string().optional(),
    image: z.string(),
    date: z.string(),
    bestTimeToVisit: z.string(),
    dailyBudget: z.object({
      low: z.number(),
      mid: z.number(),
      high: z.number(),
      currency: z.string().default('USD'),
    }),
    kidFriendlyAttractions: z.array(z.string()),
    safetyTips: z.array(z.string()),
    pickyEaterFood: z.array(z.string()),
    strollerFriendly: z.enum(['Excellent', 'Good', 'Challenging']),
    napTimeTips: z.string(),
    recommendedAges: z.string(),
    content: z.string(),
  }),
  transform: async (doc) => {
    return {
      ...doc,
      slug:
        doc.slug ??
        `${doc.country}-${doc.city}`
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-'),
    }
  },
})

export default defineConfig({
  collections: [posts],
})
