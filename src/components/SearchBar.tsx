import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function SearchBar({
  compact = false,
  initialValue = '',
}: {
  compact?: boolean
  initialValue?: string
}) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    navigate({ to: '/search', search: { q: value.trim() } })
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search destinations, countries, cities..."
        aria-label="Search destinations"
        className={
          compact
            ? 'w-full rounded-full border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-amber-500 focus:bg-white'
            : 'w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-base shadow-sm outline-none focus:border-amber-500'
        }
      />
    </form>
  )
}
