import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X, Plane } from 'lucide-react'

import { AdSlot } from '@/components/AdSlot'
import { SearchBar } from '@/components/SearchBar'
import { REGIONS, TRIP_TYPES, slugify } from '@/lib/taxonomy'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <AdSlot placement="header" />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-white">
            <Plane className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
            Little Wanderers
          </span>
        </Link>

        <div className="hidden max-w-md flex-1 lg:block">
          <SearchBar compact />
        </div>

        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium text-stone-700 hover:text-amber-700"
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/assistant"
            className="text-sm font-medium text-stone-700 hover:text-amber-700"
          >
            Trip Finder
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-stone-700 hover:text-amber-700"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-stone-700 hover:text-amber-700"
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="hidden border-t border-stone-100 bg-stone-50 lg:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2.5 text-sm">
          <span className="font-semibold uppercase tracking-wide text-stone-400 text-xs">
            Regions
          </span>
          {REGIONS.map((region) => (
            <Link
              key={region}
              to="/region/$region"
              params={{ region: slugify(region) }}
              className="text-stone-600 hover:text-amber-700"
              activeProps={{ className: 'text-amber-700 font-semibold' }}
            >
              {region}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-stone-300" />
          <span className="font-semibold uppercase tracking-wide text-stone-400 text-xs">
            Trip Type
          </span>
          {TRIP_TYPES.map((type) => (
            <Link
              key={type}
              to="/trip-type/$tripType"
              params={{ tripType: slugify(type) }}
              className="text-stone-600 hover:text-amber-700"
              activeProps={{ className: 'text-amber-700 font-semibold' }}
            >
              {type}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-stone-200 px-4 py-4 lg:hidden">
          <SearchBar compact />
          <nav className="mt-4 flex flex-col gap-3 text-sm font-medium text-stone-700">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/assistant" onClick={() => setMenuOpen(false)}>
              Trip Finder (AI)
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <div className="mt-2 border-t border-stone-100 pt-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                Regions
              </p>
              <div className="flex flex-wrap gap-3">
                {REGIONS.map((region) => (
                  <Link
                    key={region}
                    to="/region/$region"
                    params={{ region: slugify(region) }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {region}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-2 border-t border-stone-100 pt-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                Trip Type
              </p>
              <div className="flex flex-wrap gap-3">
                {TRIP_TYPES.map((type) => (
                  <Link
                    key={type}
                    to="/trip-type/$tripType"
                    params={{ tripType: slugify(type) }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {type}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
