import { allPosts } from 'content-collections'

export function getDestinationSummaries() {
  return allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    country: post.country,
    city: post.city,
    region: post.region,
    tripTypes: post.tripTypes,
    summary: post.summary,
    bestTimeToVisit: post.bestTimeToVisit,
    dailyBudgetUsd: post.dailyBudget,
    recommendedAges: post.recommendedAges,
    strollerFriendly: post.strollerFriendly,
  }))
}
