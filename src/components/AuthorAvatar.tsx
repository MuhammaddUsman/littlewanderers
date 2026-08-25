interface AuthorAvatarProps {
  size?: number
  className?: string
}

// A simple illustrated avatar for the site's author persona. This is
// intentionally an illustration (not a photo) — using a fake "photo" of a
// person who doesn't exist would be misleading, while an illustrated avatar
// is an honest, common way for a written persona to have a visual identity.
export function AuthorAvatar({ size = 64, className = '' }: AuthorAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="authorAvatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#authorAvatarBg)" />
      {/* Simple sun-hat silhouette motif, tying to "travel" without depicting a specific face */}
      <ellipse cx="32" cy="40" rx="16" ry="5" fill="#fff7ed" opacity="0.9" />
      <path
        d="M20 38c0-8 5-15 12-15s12 7 12 15"
        fill="#fff7ed"
        opacity="0.9"
      />
      <circle cx="32" cy="24" r="4" fill="#fff7ed" opacity="0.9" />
    </svg>
  )
}
