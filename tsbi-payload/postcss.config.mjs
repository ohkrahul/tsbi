// Tailwind v4 — only expands in CSS that `@import "tailwindcss"` (the /studio
// route group). Payload's prebuilt admin CSS passes through untouched.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
