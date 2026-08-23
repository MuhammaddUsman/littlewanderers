import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: [
      { title: 'Contact — Little Wanderers' },
      {
        name: 'description',
        content: 'Get in touch with the Little Wanderers family travel team.',
      },
    ],
  }),
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="font-serif text-4xl font-bold text-stone-900">Contact Us</h1>
      <p className="mt-4 text-lg text-stone-600">
        Questions, destination suggestions, or feedback on a guide? We'd love to
        hear from you.
      </p>

      {status === 'sent' ? (
        <div className="mt-8 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
          <Mail className="h-5 w-5 shrink-0" />
          <p>Thanks for reaching out — we'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <label htmlFor="name" className="text-sm font-medium text-stone-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={fields.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={fields.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-stone-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={fields.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-amber-600 px-6 py-2.5 font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'error' && (
            <p className="text-sm text-red-600">
              Something went wrong. Please try again in a moment.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
