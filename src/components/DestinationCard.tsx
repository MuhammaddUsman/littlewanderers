import { Link } from '@tanstack/react-router'
import { MapPin, Wallet } from 'lucide-react'

import { type Post } from 'content-collections'

export function DestinationCard({
  post,
  featured = false,
}: {
  post: Post
  featured?: boolean
}) {
  return (
    <Link
      to="/destinations/$slug"
      params={{ slug: post.slug! }}
      className="group block"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-lg">
        <div
          className={`relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
        >
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/placeholder.png'
            }}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700 backdrop-blur">
            {post.region}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-amber-700">
            <MapPin className="h-3.5 w-3.5" />
            {post.city}, {post.country}
          </div>
          <h3
            className={`font-serif font-bold text-stone-900 group-hover:text-amber-700 ${featured ? 'text-2xl' : 'text-lg'}`}
          >
            {post.title}
          </h3>
          <p className="line-clamp-2 flex-1 text-sm text-stone-600">{post.summary}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
            <span className="flex items-center gap-1 font-medium text-stone-700">
              <Wallet className="h-3.5 w-3.5" />
              ${post.dailyBudget.mid}/day family of 4
            </span>
            {post.tripTypes.slice(0, 2).map((type) => (
              <span
                key={type}
                className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-600"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
