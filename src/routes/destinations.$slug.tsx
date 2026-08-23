import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { marked } from 'marked'
import {
  CalendarDays,
  Wallet,
  ShieldCheck,
  Utensils,
  Baby,
  Ticket,
  MapPin,
} from 'lucide-react'

import { allPosts } from 'content-collections'

import { AdSlot } from '@/components/AdSlot'
import { DestinationCard } from '@/components/DestinationCard'

export const Route = createFileRoute('/destinations/$slug')({
  loader: async ({ params }) => {
    const post = allPosts.find((post) => post.slug === params.slug)
    if (!post) throw notFound()
    const related = allPosts
      .filter((p) => p.slug !== post.slug && p.region === post.region)
      .slice(0, 3)
    return { post, related }
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            {
              title: `${loaderData.post.title} — Family Travel Guide | Little Wanderers`,
            },
            { name: 'description', content: loaderData.post.summary },
          ],
        }
      : {},
  component: RouteComponent,
})

function RouteComponent() {
  const { post, related } = Route.useLoaderData()

  return (
    <div>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 text-white">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
            <MapPin className="h-3.5 w-3.5" />
            {post.city}, {post.country} · {post.region}
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <p className="text-lg leading-relaxed text-stone-700">{post.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tripTypes.map((type) => (
              <Link
                key={type}
                to="/trip-type/$tripType"
                params={{ tripType: type.toLowerCase().replace(/\s+/g, '-') }}
                className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100"
              >
                {type}
              </Link>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-stone-200 bg-stone-50 p-6 sm:grid-cols-4">
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <CalendarDays className="h-3.5 w-3.5" /> Best Time
              </dt>
              <dd className="mt-1 text-sm text-stone-800">{post.bestTimeToVisit}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <Wallet className="h-3.5 w-3.5" /> Daily Budget (Family of 4)
              </dt>
              <dd className="mt-1 text-sm text-stone-800">
                ${post.dailyBudget.low}–${post.dailyBudget.high}{' '}
                <span className="text-stone-500">(avg ${post.dailyBudget.mid})</span>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <Baby className="h-3.5 w-3.5" /> Stroller-Friendly
              </dt>
              <dd className="mt-1 text-sm text-stone-800">{post.strollerFriendly}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <Ticket className="h-3.5 w-3.5" /> Best Ages
              </dt>
              <dd className="mt-1 text-sm text-stone-800">{post.recommendedAges}</dd>
            </div>
          </dl>

          <div
            className="prose prose-stone mt-10 max-w-none prose-headings:font-serif prose-h2:text-2xl"
            dangerouslySetInnerHTML={{ __html: marked(post.content) }}
          />

          <section className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                <Ticket className="h-5 w-5 text-amber-600" /> Kid-Friendly Attractions
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {post.kidFriendlyAttractions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                <ShieldCheck className="h-5 w-5 text-amber-600" /> Safety Tips
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {post.safetyTips.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                <Utensils className="h-5 w-5 text-amber-600" /> Food for Picky Eaters
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {post.pickyEaterFood.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                <Baby className="h-5 w-5 text-amber-600" /> Nap-Time & Logistics
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">
                {post.napTimeTips}
              </p>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                More in {post.region}
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <DestinationCard post={r} key={r._meta.path} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="sticky top-6 space-y-6">
            <AdSlot placement="sidebar" />
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-5">
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Quick Facts
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                <li>
                  <span className="font-semibold">Region:</span> {post.region}
                </li>
                <li>
                  <span className="font-semibold">Trip type:</span>{' '}
                  {post.tripTypes.join(', ')}
                </li>
                <li>
                  <span className="font-semibold">Budget:</span> $
                  {post.dailyBudget.mid}/day
                </li>
              </ul>
              <Link
                to="/assistant"
                className="mt-4 inline-block rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
              >
                Ask our AI Trip Finder
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
