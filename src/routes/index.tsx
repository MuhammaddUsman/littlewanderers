import { createFileRoute } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import { DestinationsPage } from '@/components/DestinationsPage'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'Little Wanderers — Family Travel Guides for Parents' },
      {
        name: 'description',
        content:
          'Kid-tested family travel guides with budgets, safety tips, stroller notes, and picky-eater food picks for every destination.',
      },
    ],
  }),
})

function Home() {
  const posts = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : -1))
  return (
    <DestinationsPage
      title="Family Travel, Actually Planned for Families"
      description="Real, kid-tested guides covering budgets, safety, stroller-friendliness, and picky-eater food for every destination — so you can plan the trip instead of googling it at midnight."
      posts={posts}
    />
  )
}
