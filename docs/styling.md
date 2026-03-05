# Styling

## Rules
- All design values (colours, spacing, radii, shadows) live in `src/index.css` as CSS custom properties or utility classes
- No inline style objects for design decisions — inline styles only for dynamic values (state-driven widths, conditional colours, animation progress)
- Mobile-first: base styles target mobile, `@media (min-width: 768px)` handles desktop
- Touch targets: minimum 36×36px (`.btn-icon` enforces this)
- iOS zoom prevention: inputs use `font-size: max(16px, 13px)` (iOS zooms on inputs < 16px)

## CSS custom properties (--vars)
Defined in `:root` in `index.css`. Never hardcode colour hex values outside `:root`.

Key vars: `--bg-primary`, `--bg-secondary`, `--bg-card`, `--bg-card-hover`, `--border`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent`, `--accent-hover`, `--accent-subtle`, `--success`, `--warning`, `--danger`, `--focus-color`, `--break-color`, `--long-break-color`, `--radius-sm/md/lg/xl`, `--shadow-sm/md/lg`, `--transition`, `--bottom-nav-height`

## Component classes
| Class | Description |
|-------|-------------|
| `.btn` | Base button — flex, gap, padding, font, tap |
| `.btn-primary/secondary/ghost/danger/success` | Colour variants |
| `.btn-sm / .btn-lg` | Size variants |
| `.btn-icon` | Square icon button, min 36×36px |
| `.card` | Dark card, border, radius-lg, padding 16px (desktop: 20px) |
| `.card-sm` | Smaller card padding |
| `.card-hover` | Hover state for clickable cards |
| `.input` | Full-width styled input/select/textarea |
| `.badge` | Pill badge base |
| `.badge-accent/success/warning/danger/muted` | Badge colour variants |
| `.progress / .progress-bar` | Thin progress bar |
| `.modal-overlay` | Fixed overlay, bottom-aligned on mobile |
| `.modal` | Bottom sheet on mobile, centered card on desktop |
| `.tabs / .tab / .tab.active` | Segmented control |
| `.empty-state` | Centered placeholder layout |
| `.desktop-nav` | Hidden on mobile, flex on desktop |
| `.bottom-nav` | Fixed bottom bar on mobile, hidden on desktop |
| `.main-content` | Main scroll area — bottom padding matches bottom nav height |
| `.w-full` | `width: 100%` utility |

## Responsive breakpoint
Single breakpoint: `min-width: 768px`

Mobile defaults: bottom-sheet modals, bottom nav, full-width inputs at 16px font, `.bottom-nav-height = 60px`
Desktop overrides: centered modals, top nav, smaller input font (13px), `.bottom-nav-height = 0px`

## iOS safe area
Bottom nav and modal padding use `env(safe-area-inset-bottom, 0px)` to clear the home indicator on notched iPhones.
