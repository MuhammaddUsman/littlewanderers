import { createFileRoute, Link } from '@tanstack/react-router'

import { AuthorAvatar } from '@/components/AuthorAvatar'
import { AUTHOR_NAME, AUTHOR_TITLE, AUTHOR_BIO_LONG } from '@/lib/author'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [
      { title: 'About — Little Wanderers' },
      {
        name: 'description',
        content:
          'Little Wanderers writes practical, kid-tested family travel guides for parents planning trips with children.',
      },
    ],
  }),
})

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-serif text-4xl font-bold text-stone-900">
        About Little Wanderers
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-stone-700">
        Little Wanderers exists because most travel content is written for people
        without kids. It answers "what's the nightlife like" instead of "is there
        a stroller ramp" or "will my picky seven-year-old find something to eat."
      </p>
      <p className="mt-4 leading-relaxed text-stone-700">
        Every guide on this site is built around the questions parents actually
        ask before booking a family trip: When should we go? What will it cost
        for four of us, per day? Is it safe with young kids? Can we push a
        stroller around, or should we bring a carrier? Where do naps fit into the
        day? And — critically — what will our picky eater actually eat?
      </p>
      <p className="mt-4 leading-relaxed text-stone-700">
        We organize destinations by region — Asia, Europe, the Americas, and the
        Middle East — and by trip type, whether you're after a beach holiday, a
        city break, an adventure trip, something budget-friendly, or an
        all-inclusive resort stay. If you're not sure where to start, our AI Trip
        Finder can suggest destinations based on your kids' ages and your budget.
      </p>
      <section className="mt-12 rounded-xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Who Writes These Guides
        </h2>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
          <AuthorAvatar size={72} className="shrink-0" />
          <div>
            <p className="font-serif text-lg font-bold text-stone-900">
              {AUTHOR_NAME}
            </p>
            <p className="text-sm font-medium text-amber-700">{AUTHOR_TITLE}</p>
            {AUTHOR_BIO_LONG.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-stone-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <p className="mt-8 text-sm text-stone-500">
        Have a destination you think we should cover, or a correction on a
        guide? <Link to="/contact" className="font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-800">Get in touch</Link>.
      </p>
    </div>
  )
}
