# AGENTS.md

## Project Overview

Little Wanderers is a family-travel content site: destination guides written for parents planning trips with kids, with a search bar, region/trip-type filtering, an AI trip-recommendation assistant, and standard content pages (About, Contact, Privacy Policy). Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (+ `@tailwindcss/typography`) |
| Content | Content Collections (type-safe markdown in `content/posts`) |
| AI | Anthropic SDK via Netlify AI Gateway (`src/routes/api.assistant.ts`) |
| Forms | Netlify Forms (contact page) |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── content/posts/            # One markdown file per destination (see schema below)
├── content-collections.ts    # Zod schema for destination frontmatter
├── public/
│   └── contact-form.html     # Static form skeleton so Netlify detects the contact form at build time
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Site header: logo, search, region/trip-type nav, header ad slot
│   │   ├── Footer.tsx            # Site footer with sitemap-style links
│   │   ├── AdSlot.tsx            # Placeholder ad unit (header/sidebar variants) for future AdSense
│   │   ├── SearchBar.tsx         # Search input, submits to /search?q=
│   │   ├── DestinationCard.tsx   # Magazine-style card used in grids
│   │   ├── DestinationsPage.tsx  # Shared listing layout: filters, grid, sidebar (used by /, /region/*, /trip-type/*, /search)
│   │   └── FamilyAssistant.tsx   # Chat UI for the AI Trip Finder
│   ├── lib/
│   │   ├── taxonomy.ts       # REGIONS, TRIP_TYPES constants + slugify/unslugify helpers
│   │   ├── destinations.ts   # Compact destination summaries fed to the AI assistant
│   │   └── utils.ts          # cn() className helper
│   ├── routes/
│   │   ├── __root.tsx                 # Root layout: Header, Footer, fonts, global meta
│   │   ├── index.tsx                  # Home: all destinations
│   │   ├── region.$region.tsx         # /region/asia, /region/europe, etc.
│   │   ├── trip-type.$tripType.tsx    # /trip-type/beach-holidays, etc.
│   │   ├── search.tsx                 # /search?q=...
│   │   ├── destinations.$slug.tsx     # Full destination guide page
│   │   ├── assistant.tsx              # AI Trip Finder page
│   │   ├── api.assistant.ts           # POST endpoint calling Anthropic via AI Gateway
│   │   ├── about.tsx
│   │   ├── contact.tsx                # Netlify Forms contact form
│   │   └── privacy-policy.tsx
│   └── styles.css            # Tailwind + typography plugin + font tokens
└── netlify.toml
```

## Content Model

Each destination post in `content/posts/*.md` has frontmatter validated by `content-collections.ts`:

- `title`, `country`, `city`, `summary`, `image`, `date`
- `region`: one of `Asia`, `Europe`, `Americas`, `Middle East`
- `tripTypes`: array from `Beach Holidays`, `City Breaks`, `Adventure`, `Budget-Friendly`, `All-Inclusive`
- `bestTimeToVisit`, `dailyBudget` (`low`/`mid`/`high` USD for a family of four), `recommendedAges`
- `kidFriendlyAttractions[]`, `safetyTips[]`, `pickyEaterFood[]`
- `strollerFriendly`: `Excellent` | `Good` | `Challenging`, `napTimeTips`
- `content`: markdown body rendered on the destination page

Slugs are auto-derived from `country`-`city` (e.g. `tokyo-japan`) unless a `slug` field is set explicitly. Clean URLs live at `/destinations/{slug}`.

To add a new destination, create a new markdown file in `content/posts/` following this schema — it's automatically picked up by the home page, its region page, its trip-type page(s), search, and the AI assistant's dataset.

## AI Trip Finder

`src/routes/api.assistant.ts` sends the full list of destination summaries (from `src/lib/destinations.ts`) plus the running chat history to Claude via the Netlify AI Gateway (no API key management needed — Netlify injects credentials at runtime). The system prompt instructs the model to recommend only from the provided destination list and to tag recommendations as `[[slug:some-slug]]`, which `FamilyAssistant.tsx` turns into real links to the destination page.

## Conventions

- Components: PascalCase. Routes: TanStack Router file-based conventions (dot-separated path segments).
- Tailwind utility classes throughout; `cn()` for conditional merging.
- Strict TypeScript; no unused locals/params.
- Ad placements are inert placeholders (`AdSlot.tsx`) — swap in real AdSense markup there when ready, no other files need to change.

## Environment Variables

AI Trip Finder uses the Netlify AI Gateway, which injects `ANTHROPIC_API_KEY`/`ANTHROPIC_BASE_URL` automatically in deployed environments — no manual configuration required.
