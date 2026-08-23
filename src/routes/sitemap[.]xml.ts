import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import { REGIONS, TRIP_TYPES, slugify } from '@/lib/taxonomy'

const SITE_URL = 'https://littlewanderers.netlify.app'

function urlEntry(loc: string, lastmod?: string, priority = '0.7') {
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <priority>${priority}</priority>
  </url>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const staticPages = [
          urlEntry(`${SITE_URL}/`, undefined, '1.0'),
          urlEntry(`${SITE_URL}/about`),
          urlEntry(`${SITE_URL}/contact`),
          urlEntry(`${SITE_URL}/privacy-policy`, undefined, '0.3'),
          urlEntry(`${SITE_URL}/assistant`),
          urlEntry(`${SITE_URL}/search`, undefined, '0.4'),
        ]

        const destinationPages = allPosts.map((post: (typeof allPosts)[number]) =>
          urlEntry(`${SITE_URL}/destinations/${post.slug}`, post.date, '0.9'),
        )

        const regionPages = REGIONS.map((region) =>
          urlEntry(`${SITE_URL}/region/${slugify(region)}`, undefined, '0.6'),
        )

        const tripTypePages = TRIP_TYPES.map((tripType) =>
          urlEntry(`${SITE_URL}/trip-type/${slugify(tripType)}`, undefined, '0.6'),
        )

        const body = [...staticPages, ...destinationPages, ...regionPages, ...tripTypePages].join(
          '\n',
        )

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        })
      },
    },
  },
})
