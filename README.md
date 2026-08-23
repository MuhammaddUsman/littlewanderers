# Little Wanderers

A family-travel blog for parents planning trips with kids. Every destination guide covers the things parents actually need to plan around: best time to visit, kid-friendly attractions, a daily budget for a family of four, safety tips, food for picky eaters, stroller-friendliness, and nap-time logistics.

## Features

- Individual destination guides (Tokyo, Bali, Lisbon, Paris, Costa Rica, Cancun, Orlando, Dubai, Jordan, Crete, Chiang Mai, Tel Aviv, and more to come)
- Filtering by region (Asia, Europe, Americas, Middle East) and trip type (Beach Holidays, City Breaks, Adventure, Budget-Friendly, All-Inclusive)
- Site-wide search
- An AI Trip Finder that recommends destinations based on kids' ages and budget
- About, Contact (Netlify Forms), and Privacy Policy pages
- Clean, editorial magazine-style design, mobile-responsive, with large destination photography
- SEO-friendly clean URLs (`/destinations/tokyo-japan`) and per-page titles/descriptions
- Placeholder ad slots in the header and sidebar, ready for future AdSense integration

## Tech Stack

- [TanStack Start](https://tanstack.com/start) + TanStack Router (file-based routing)
- React 19, TypeScript (strict)
- Tailwind CSS 4 with the typography plugin
- [Content Collections](https://www.content-collections.dev/) for type-safe markdown destination guides
- Anthropic via the Netlify AI Gateway for the AI Trip Finder
- Netlify Forms for the contact form
- Deployed on Netlify

## Running Locally

```bash
npm install
npm run dev
```

The dev server runs on port 3000. Netlify Forms only process real submissions once deployed — the contact form UI still renders locally, but submissions require a deploy preview or production deploy.

## Adding a Destination

Add a new markdown file to `content/posts/` following the frontmatter schema in `content-collections.ts` (region, trip types, budget, attractions, safety tips, etc.). It's automatically picked up across the homepage, region/trip-type filters, search, and the AI Trip Finder.

## Project Structure

See `AGENTS.md` for a full breakdown of the codebase.
