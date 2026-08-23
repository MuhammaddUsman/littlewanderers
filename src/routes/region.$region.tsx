import { createFileRoute, notFound } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import { DestinationsPage } from '@/components/DestinationsPage'
import { REGIONS, slugify, unslugify } from '@/lib/taxonomy'

export const Route = createFileRoute('/region/$region')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const region = unslugify(params.region, REGIONS)
    if (!region) throw notFound()
    return { region }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.region} Family Travel Guides — Little Wanderers` },
          {
            name: 'description',
            content: `Family travel guides for ${loaderData.region}, with budgets, safety tips, and kid-friendly attractions for parents traveling with kids.`,
          },
        ]
      : [],
  }),
})

function RouteComponent() {
  const { region } = Route.useLoaderData()
  const posts = allPosts.filter((post) => post.region === region)

  return (
    <DestinationsPage
      title={`Family Travel in ${region}`}
      description={`Kid-tested destination guides across ${region} — budgets, safety tips, and picky-eater-approved food, all in one place.`}
      posts={posts}
      activeRegion={slugify(region)}
    />
  )
}
