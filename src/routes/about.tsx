import { createFileRoute } from '@tanstack/react-router'

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
      <p className="mt-4 leading-relaxed text-stone-700">
        We're a small team of parents who travel constantly with our own kids and
        write down what actually worked — and what didn't — so your planning
        starts from real experience instead of a generic listicle.
      </p>
    </div>
  )
}
