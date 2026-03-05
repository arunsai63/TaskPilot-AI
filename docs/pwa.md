# PWA and Deployment

## Plugin
`vite-plugin-pwa` version **1.2.0** — do not change. The 0.x line does not exist for Vite 7.

## vite.config.js key settings
```js
base: '/TaskPilot-AI/'   // required for GitHub Pages
VitePWA({
  registerType: 'autoUpdate',
  manifest: { ... },
  workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] }
})
```

## Icons (public/)
| File | Usage |
|------|-------|
| logo.svg | Source / any SVG usage |
| pwa-192x192.png | PWA manifest `icons` |
| pwa-512x512.png | PWA manifest `icons`, maskable |
| apple-touch-icon.png | iOS home screen |
| favicon.ico | Browser tab |

## Deployment
- **Auto**: GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main` — builds then deploys `dist/` to GitHub Pages via `actions/deploy-pages`
- **Manual fallback**: `npm run deploy` — uses `gh-pages` package to push `dist/` to the `gh-pages` branch

Live URL: `https://arunsai63.github.io/TaskPilot-AI/`

## Install prompt
`InstallPrompt` component in `App.jsx` listens for `beforeinstallprompt`, shows a banner above the bottom nav. Calls `prompt.prompt()` on confirm. Dismissed on "Later".
