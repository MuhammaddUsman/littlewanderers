import { useState } from 'react'
import { Mail } from 'lucide-react'

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    try {
      // Posting to '/' (not a separate/orphan page) is what makes Netlify's
      // form bot reliably intercept this — same fix that solved the contact
      // form silently failing earlier.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'newsletter', 'bot-field': '', email }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('sent')
      setEmail('')
    } catch (err) {
      console.error('Newsletter signup error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="rounded-xl border border-stone-700 bg-stone-800/60 px-6 py-8 sm:px-10">
      {/*
        Hidden, server-rendered form purely so Netlify's build-time crawler
        can detect and register the "newsletter" form — the footer renders
        on every page, so this is guaranteed to be part of real page HTML on
        any normal deploy. The visible form below (with React state) is what
        users actually interact with; this one is never shown or submitted
        itself.
      */}
      <form name="newsletter" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="email" name="email" />
        <input name="bot-field" />
      </form>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 font-serif text-lg font-bold text-white">
            <Mail className="h-5 w-5 text-amber-400" />
            Get new guides in your inbox
          </p>
          <p className="mt-1 text-sm text-stone-400">
            One email whenever we publish a new destination guide. No spam, unsubscribe anytime.
          </p>
        </div>

        {status === 'sent' ? (
          <p className="text-sm font-semibold text-amber-400">
            You&rsquo;re on the list — thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm items-center gap-2 sm:w-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={200}
              className="w-full min-w-0 rounded-full border border-stone-600 bg-stone-900 px-4 py-2 text-sm text-white placeholder-stone-500 outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="shrink-0 rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
            >
              {status === 'sending' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </div>
  )
}
