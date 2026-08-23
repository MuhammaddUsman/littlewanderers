import { Link } from '@tanstack/react-router'

import { type Post } from 'content-collections'

import { AdSlot } from '@/components/AdSlot'
import { DestinationCard } from '@/components/DestinationCard'
import { SearchBar } from '@/components/SearchBar'
import { REGIONS, TRIP_TYPES, slugify } from '@/lib/taxonomy'

export function DestinationsPage({
  title,
  description,
  posts,
  activeRegion,
  activeTripType,
}: {
  title: string
  description?: string
  posts: Post[]
  activeRegion?: string
  activeTripType?: string
}) {
  const [featured, ...rest] = posts

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-stone-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-lg text-stone-600">{description}</p>
        )}
        <div className="mt-6 max-w-xl">
          <SearchBar />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          to="/"
          className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
            !activeRegion && !activeTripType
              ? 'border-amber-600 bg-amber-600 text-white'
              : 'border-stone-200 text-stone-600 hover:border-amber-400'
          }`}
        >
          All
        </Link>
        {REGIONS.map((region) => (
          <Link
            key={region}
            to="/region/$region"
            params={{ region: slugify(region) }}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
              activeRegion === slugify(region)
                ? 'border-amber-600 bg-amber-600 text-white'
                : 'border-stone-200 text-stone-600 hover:border-amber-400'
            }`}
          >
            {region}
          </Link>
        ))}
        <span className="mx-1 hidden h-7 w-px bg-stone-200 sm:block" />
        {TRIP_TYPES.map((type) => (
          <Link
            key={type}
            to="/trip-type/$tripType"
            params={{ tripType: slugify(type) }}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
              activeTripType === slugify(type)
                ? 'border-amber-600 bg-amber-600 text-white'
                : 'border-stone-200 text-stone-600 hover:border-amber-400'
            }`}
          >
            {type}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-300 p-10 text-center text-stone-500">
          No destinations found yet for this filter. Check back soon — we're adding
          new guides regularly.
        </p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            {featured && (
              <div className="mb-8">
                <DestinationCard post={featured} featured />
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <DestinationCard post={post} key={post._meta.path} />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-6 space-y-6">
              <AdSlot placement="sidebar" />
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-5">
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Not sure where to go?
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Tell our AI Trip Finder your kids' ages and your budget, and get
                  matched with destinations from our guides.
                </p>
                <Link
                  to="/assistant"
                  className="mt-3 inline-block rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
                >
                  Try the Trip Finder
                </Link>
              </div>
              <AdSlot placement="sidebar" />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
