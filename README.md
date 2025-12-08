# time-sqd-co

A small SPA to calculate and display time differences between dates. The UI lets you enter a past date (defaults to 2000‑01‑01) and shows the days between that date and today along with a symmetrical "equal days before" date.

## Quick start

Prerequisites

- Node.js (14+ recommended)
- npm or yarn

Install and run

```bash
# install
npm install

# dev server
npm run dev

# build for production
npm run build

# preview production build
npm run serve
```

## Project layout (important files)

- package.json — project metadata and scripts.
- index.html — Vite entry (loads `/src/main.tsx`).
- src/main.tsx — React entry; mounts the app.
- src/App.tsx — top-level component; holds the targetDate state (defaults to Jan 1, 2000) and passes it into TimeDisplay.
- src/components/TimeDisplay.tsx — main UI: shows pastTime, today, difference in days and includes the inline date input (date picker). Exposes `onPastDateChange?: (date: Date) => void` to update the parent state.
- src/styles/app.css — application styles (controls layout, centering and sizing).
- .gitignore — ignores node_modules.

## Behavior / notes

- Default target/past date: Jan 1, 2000.
- The inline date input uses a local edit string to avoid clobbering user typing mid-edit; commits to parent only when the browser reports a complete date or on blur.
- valueAsDate / UTC handling: the app normalizes date inputs using UTC getters to avoid timezone-induced off-by-one-day issues.
- Time formatting: dates rendered as short month (e.g. "Jan 1, 2000").

## License

MIT
