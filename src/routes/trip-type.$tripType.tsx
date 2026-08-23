import { createFileRoute, notFound } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import { DestinationsPage } from '@/components/DestinationsPage'
import { TRIP_TYPES, slugify, unslugify } from '@/lib/taxonomy'

export const Route = createFileRoute('/trip-type/$tripType')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const tripType = unslugify(params.tripType, TRIP_TYPES)
    if (!tripType) throw notFound()
    return { tripType }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.tripType} Family Trips — Little Wanderers` },
          {
            name: 'description',
            content: `Family-friendly ${loaderData.tripType.toLowerCase()} destinations with budgets, safety tips, and logistics for parents traveling with kids.`,
          },
        ]
      : [],
  }),
})

function RouteComponent() {
  const { tripType } = Route.useLoaderData()
  const posts = allPosts.filter((post) => post.tripTypes.includes(tripType as never))

  return (
    <DestinationsPage
      title={`${tripType} for Families`}
      description={`Handpicked ${tripType.toLowerCase()} destinations that work for parents traveling with kids.`}
      posts={posts}
      activeTripType={slugify(tripType)}
    />
  )
}
