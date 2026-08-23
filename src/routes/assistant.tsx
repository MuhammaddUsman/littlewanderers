import { createFileRoute } from '@tanstack/react-router'

import { FamilyAssistant } from '@/components/FamilyAssistant'
import { AdSlot } from '@/components/AdSlot'

export const Route = createFileRoute('/assistant')({
  component: AssistantPage,
  head: () => ({
    meta: [
      { title: 'AI Trip Finder — Little Wanderers' },
      {
        name: 'description',
        content:
          "Tell our AI Trip Finder your kids' ages and your budget to get matched with family-friendly destinations.",
      },
    ],
  }),
})

function AssistantPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-stone-900">
          Find Your Family's Next Trip
        </h1>
        <p className="mt-3 text-lg text-stone-600">
          Tell us your kids' ages and your daily budget, and our AI Trip Finder
          will match you with destinations from our guides.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <FamilyAssistant />
        <aside className="space-y-6">
          <AdSlot placement="sidebar" />
        </aside>
      </div>
    </div>
  )
}
