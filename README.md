# Processly — Marketing Website

Static marketing website for **Processly**, a visual process & project orchestration platform. Built with Vite + React + TypeScript + Tailwind, designed to deploy as static files to GitHub Pages.

## Stack

- **Vite** (static build, no SSR)
- **React 18** + **TypeScript**
- **Tailwind CSS v3** for styling
- **Framer Motion** for entrance / micro-interactions
- **Lucide React** for icons
- **Inter** + **Instrument Serif** (Google Fonts)

No router — single-page marketing site with anchor navigation.

## Project structure

```
.
├── public/
│   └── favicon.svg
├── src/
│   ├── components/      # primitives (Container, Button, Logo, BackToTop, ...)
│   │   ├── DagDiagram.tsx     # animated SVG node graph (hero centerpiece)
│   │   └── ProcessMockup.tsx  # editor / dashboard / projects mocks
│   ├── layout/          # Nav, Footer
│   ├── lib/             # shared motion variants
│   ├── sections/        # Hero, Trust, Problem, Solution, Features,
│   │                    # HowItWorks, Showcase, UseCases, Architecture,
│   │                    # Benefits, CTA
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── .github/workflows/deploy.yml
```

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

## Production build

```bash
npm run build       # -> ./dist
npm run preview     # serve the built bundle locally
```

## GitHub Pages deployment

The site is configured to deploy automatically on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### One-time setup

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

The workflow:

- builds with `VITE_BASE=/<repo-name>/` so all assets resolve under the subpath;
- copies `dist/index.html` to `dist/404.html` so deep anchor links survive a refresh;
- publishes `dist/` as the Pages artifact.

Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Manual / custom-domain build

If you deploy somewhere else (Netlify, Cloudflare Pages, a custom domain at the root, etc.) just build without the base override:

```bash
npm run build
```

If you deploy to a different subpath, set `VITE_BASE` to that path (must include trailing slash):

```bash
VITE_BASE=/some/path/ npm run build
```

> **Windows / Git Bash gotcha:** Git Bash auto-translates leading-slash strings into Windows paths, so `VITE_BASE=/foo/` becomes something like `/c/Program Files/Git/foo/`. Disable that with `MSYS_NO_PATHCONV=1`:
>
> ```bash
> MSYS_NO_PATHCONV=1 VITE_BASE=/foo/ npm run build
> ```
>
> Or, in PowerShell, `$env:VITE_BASE="/foo/"; npm run build`. (CI runs on Ubuntu, so this only matters for local subpath testing on Windows.)

## Customisation pointers

- **Brand colours**: [`tailwind.config.ts`](tailwind.config.ts) — `ink` (warm neutral) and `iris` (indigo-violet primary).
- **Hero copy & visual**: [`src/sections/Hero.tsx`](src/sections/Hero.tsx) and [`src/components/DagDiagram.tsx`](src/components/DagDiagram.tsx).
- **Section ordering**: [`src/App.tsx`](src/App.tsx).
- **Nav links**: [`src/layout/Nav.tsx`](src/layout/Nav.tsx).
- **Animation timing**: [`src/lib/motion.ts`](src/lib/motion.ts).

## Notes

- All `Get started` / `Read the docs` links currently point at placeholder anchors. Wire them up to the real product URLs when those exist.
- The mockup screenshots in `Showcase` are pure CSS / SVG — no images. Swap them out for real captures of the Processly app when you have them.
- Honors `prefers-reduced-motion`: animations are reduced to instant when the user has that preference set.
