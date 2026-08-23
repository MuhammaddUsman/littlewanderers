import { createFileRoute } from '@tanstack/react-router'
import Anthropic from '@anthropic-ai/sdk'

import { getDestinationSummaries } from '@/lib/destinations'

const SYSTEM_PROMPT = `You are the "Trip Finder," a friendly AI travel assistant for Little Wanderers, a family travel blog for parents planning trips with kids.

Your job: help parents pick a destination from the site's guides based on their kids' ages, their budget, and any preferences they mention (region, trip type, interests).

Rules:
- Only recommend destinations from the DESTINATIONS list provided below — never invent destinations that aren't in the list.
- Always ask a brief clarifying question if the parent hasn't shared kids' ages or a rough daily budget yet, unless they've given enough to make a solid recommendation already.
- When you recommend a destination, explain briefly why it fits their kids' ages and budget, referencing the destination's own recommendedAges, dailyBudgetUsd, and strollerFriendly fields.
- Recommend 1-3 destinations max per answer, ranked best fit first.
- Keep answers conversational and concise (under 180 words) — this is a chat widget, not an essay.
- Mention the destination's slug in the form [[slug:xxxx]] immediately after you name it the first time, so the UI can link to it. Example: "Tokyo [[slug:tokyo-japan]] would be a great fit."

DESTINATIONS:
${JSON.stringify(getDestinationSummaries())}`

const MODEL = 'claude-sonnet-5'

export const Route = createFileRoute('/api/assistant')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const messages: Array<{ role: 'user' | 'assistant'; content: string }> =
            Array.isArray(body?.messages) ? body.messages : []

          if (messages.length === 0) {
            return Response.json({ error: 'No messages provided' }, { status: 400 })
          }

          const anthropic = new Anthropic()

          const response = await anthropic.messages.create({
            model: MODEL,
            max_tokens: 500,
            system: SYSTEM_PROMPT,
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          })

          const textBlock = response.content.find((block) => block.type === 'text')
          const reply = textBlock && 'text' in textBlock ? textBlock.text : ''

          return Response.json({ reply })
        } catch (error) {
          console.error('Assistant error:', error)
          return Response.json(
            { error: 'The Trip Finder is unavailable right now. Please try again shortly.' },
            { status: 500 },
          )
        }
      },
    },
  },
})
