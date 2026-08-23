import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Send, Sparkles, Baby } from 'lucide-react'

import { allPosts } from 'content-collections'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const STARTER_PROMPTS = [
  'We have a 3-year-old and a 7-year-old, budget around $200/day — where should we go?',
  'Best beach destination for toddlers under $150/day?',
  'Adventure trip for teenagers on a budget',
]

function renderWithDestinationLinks(content: string) {
  const parts = content.split(/\[\[slug:([a-z0-9-]+)\]\]/g)
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const post = allPosts.find((p) => p.slug === part)
      if (!post) return null
      return (
        <Link
          key={i}
          to="/destinations/$slug"
          params={{ slug: post.slug! }}
          className="font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-800"
        >
          {post.title}
        </Link>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function FamilyAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your family Trip Finder. Tell me your kids' ages and your daily budget, and I'll suggest destinations from our guides.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Something went wrong')
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-stone-200 bg-amber-50 px-5 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="font-serif font-bold text-stone-900">AI Trip Finder</p>
          <p className="text-xs text-stone-500">Matched to kids' ages &amp; budget</p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-100 text-stone-800'
              }`}
            >
              {m.role === 'assistant' ? renderWithDestinationLinks(m.content) : m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-stone-100 px-4 py-2.5 text-sm text-stone-500">
              Finding destinations...
            </div>
          </div>
        )}
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 border-t border-stone-100 px-5 py-3">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:border-amber-400 hover:text-amber-700"
            >
              <Baby className="h-3 w-3" />
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
        className="flex items-center gap-2 border-t border-stone-200 px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Two kids, ages 4 and 9, $180/day budget..."
          className="flex-1 rounded-full border border-stone-300 px-4 py-2 text-sm outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Send"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
