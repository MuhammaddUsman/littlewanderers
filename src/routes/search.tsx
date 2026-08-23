import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { allPosts } from 'content-collections'

import { DestinationsPage } from '@/components/DestinationsPage'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: z.object({
    q: z.string().optional().default(''),
  }),
  head: () => ({
    meta: [{ title: 'Search Family Travel Guides — Little Wanderers' }],
  }),
})

function RouteComponent() {
  const { q } = Route.useSearch()
  const query = q.trim().toLowerCase()

  const posts = query
    ? allPosts.filter((post) =>
        [post.title, post.summary, post.country, post.city, post.region, ...post.tripTypes]
          .join(' ')
          .toLowerCase()
          .includes(query),
      )
    : allPosts

  return (
    <DestinationsPage
      title={q ? `Search results for "${q}"` : 'Search Destinations'}
      description={`${posts.length} destination${posts.length === 1 ? '' : 's'} found.`}
      posts={posts}
    />
  )
}
