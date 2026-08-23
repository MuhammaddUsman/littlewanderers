import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site'

import '../styles.css'

const DEFAULT_TITLE = 'Little Wanderers — Family Travel Guides for Parents'
const DEFAULT_DESCRIPTION =
  'Kid-tested family travel guides by region and trip type — budgets, safety tips, stroller notes, and picky-eater food picks for parents planning trips with kids.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: DEFAULT_TITLE,
      },
      {
        name: 'description',
        content: DEFAULT_DESCRIPTION,
      },
      // Open Graph (Facebook, WhatsApp, Pinterest, LinkedIn, etc.)
      { property: 'og:site_name', content: 'Little Wanderers' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: DEFAULT_TITLE },
      { property: 'og:description', content: DEFAULT_DESCRIPTION },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { property: 'og:url', content: SITE_URL },
      // Twitter / X card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: DEFAULT_TITLE },
      { name: 'twitter:description', content: DEFAULT_DESCRIPTION },
      { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-213943259770957"
          crossOrigin="anonymous"
        />
        <HeadContent />
      </head>
      <body className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Scripts />
      </body>
    </html>
  )
}
