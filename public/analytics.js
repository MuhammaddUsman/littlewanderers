// Google Analytics (GA4) initialization.
// Kept as its own same-origin file (rather than an inline <script> tag) so
// the site's Content-Security-Policy can stay strict (script-src 'self')
// without needing an 'unsafe-inline' exception. The measurement ID below
// is not a secret — it's always visible in a site's public page source for
// every GA4 setup, so there's no security concern putting it here directly.
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}
gtag('js', new Date())
gtag('config', 'G-9D4QKGXCJ7')
