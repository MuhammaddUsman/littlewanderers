import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-xl font-bold text-white">Little Wanderers</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              Practical, kid-tested travel guides for parents planning trips with
              children — from nap-time logistics to the best picky-eater-approved
              meals abroad.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-100">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-white">
                  AI Trip Finder
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-100">
              Regions
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/region/$region" params={{ region: 'asia' }} className="hover:text-white">
                  Asia
                </Link>
              </li>
              <li>
                <Link to="/region/$region" params={{ region: 'europe' }} className="hover:text-white">
                  Europe
                </Link>
              </li>
              <li>
                <Link to="/region/$region" params={{ region: 'americas' }} className="hover:text-white">
                  Americas
                </Link>
              </li>
              <li>
                <Link
                  to="/region/$region"
                  params={{ region: 'middle-east' }}
                  className="hover:text-white"
                >
                  Middle East
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-stone-100">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-800 pt-6 text-xs text-stone-500">
          © {new Date().getFullYear()} Little Wanderers. Family travel guides for
          parents planning trips with kids.
        </div>
      </div>
    </footer>
  )
}
