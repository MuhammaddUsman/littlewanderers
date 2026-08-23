import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Little Wanderers' },
      {
        name: 'description',
        content: 'How Little Wanderers collects, uses, and protects your data.',
      },
    ],
  }),
})

function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-serif text-4xl font-bold text-stone-900">Privacy Policy</h1>
      <p className="mt-4 text-sm text-stone-500">Last updated: January 2026</p>

      <div className="prose prose-stone mt-8 max-w-none">
        <h2>Overview</h2>
        <p>
          Little Wanderers ("we", "us") publishes family travel guides at this
          website. This policy explains what information we collect, how we use
          it, and the choices you have.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Contact form submissions:</strong> when you use our contact
            form, we collect your name, email address, and message so we can
            respond to you.
          </li>
          <li>
            <strong>AI Trip Finder conversations:</strong> messages you send to
            our AI Trip Finder assistant, including any ages or budget details
            you share, are processed to generate destination recommendations.
            Conversations are not linked to your identity.
          </li>
          <li>
            <strong>Usage data:</strong> like most websites, our hosting provider
            may log standard technical data such as browser type, pages visited,
            and approximate location for security and analytics purposes.
          </li>
          <li>
            <strong>Cookies and advertising:</strong> this site includes
            placeholder ad slots reserved for future advertising (such as Google
            AdSense). If enabled, third-party advertising services may use
            cookies to serve relevant ads and measure performance.
          </li>
        </ul>

        <h2>How We Use Information</h2>
        <p>
          We use the information we collect to respond to inquiries, improve our
          content and recommendations, keep the site secure, and — where
          advertising is enabled — support the site through relevant, non-intrusive
          ads.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services for form handling, AI-powered
          recommendations, and (in the future) advertising. These providers
          process data according to their own privacy policies.
        </p>

        <h2>Your Choices</h2>
        <p>
          You can decline to use the contact form or AI Trip Finder if you prefer
          not to share information. Most browsers let you block or delete cookies
          through their settings.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          This site is intended for use by parents and guardians planning travel.
          We do not knowingly collect personal information directly from
          children.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this policy, please reach out via our{' '}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  )
}
