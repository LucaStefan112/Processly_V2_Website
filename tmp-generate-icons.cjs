// Generate brand PNGs (icons, logos, OG image) using Playwright.
// Brand mark stays faithful to src/components/Logo.tsx (3 nodes, 32x32 viewBox).
// Composed art (lockup, OG image) is rendered via HTML so we get real web fonts.

const path = require('path')
const fs = require('fs')

const playwrightPath = path.resolve('c:/Projects/Processly_V2/node_modules/playwright')
const { chromium } = require(playwrightPath)

const OUT = path.resolve(__dirname, 'public')
fs.mkdirSync(OUT, { recursive: true })

// ---------- Brand palette ----------
const COLORS = {
  iris: '#5B5BD6',
  emerald: '#10B981',
  ink50: '#FAFAF7',
  ink200: '#E7E7DF',
  ink600: '#4D4D47',
  ink950: '#0A0A09',
  iris300: '#A4A4F6',
  iris200: '#C8C8FB',
}

// ---------- SVG primitives ----------

// Bare brand mark (transparent background). For light surfaces.
// `nodeColor` is the second (top-right) node — defaults to ink-950 for contrast on light bg.
// `strokeColor` controls the connector lines.
function svgMark({ nodeColor = COLORS.ink950, strokeColor = COLORS.ink950 } = {}) {
  // Path is drawn first so the circles render on top, covering line caps
  // for a clean "connectors → nodes" composition at any scale.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path d="M9 9 L16 22 M23 9 L16 22" stroke="${strokeColor}" stroke-width="1.6" stroke-linecap="round" opacity="0.55"/>
  <circle cx="9" cy="9" r="3" fill="${COLORS.iris}"/>
  <circle cx="23" cy="9" r="3" fill="${nodeColor}"/>
  <circle cx="16" cy="22" r="3" fill="${COLORS.emerald}"/>
</svg>`
}

// App icon: rounded ink-950 square + the mark centered, scaled to ~64% of icon area.
// Used for favicon, apple-touch, PWA icons.
function svgAppIcon() {
  // 96-unit canvas with 12-unit padding; mark scales from 32 viewBox to 72px area.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
  <rect width="96" height="96" rx="22" fill="${COLORS.ink950}"/>
  <g transform="translate(12, 12) scale(2.25)">
    <path d="M9 9 L16 22 M23 9 L16 22" stroke="${COLORS.ink50}" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
    <circle cx="9" cy="9" r="3" fill="${COLORS.iris}"/>
    <circle cx="23" cy="9" r="3" fill="${COLORS.ink50}"/>
    <circle cx="16" cy="22" r="3" fill="${COLORS.emerald}"/>
  </g>
</svg>`
}

// Maskable PWA icon: same as app icon but with a generous safe area
// (the icon must fit inside a 40%-radius circle per the spec).
function svgMaskableIcon() {
  // 256 canvas, 64px padding so the visible mark is in the inner ~50%.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" fill="${COLORS.ink950}"/>
  <g transform="translate(64, 64) scale(4)">
    <path d="M9 9 L16 22 M23 9 L16 22" stroke="${COLORS.ink50}" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
    <circle cx="9" cy="9" r="3" fill="${COLORS.iris}"/>
    <circle cx="23" cy="9" r="3" fill="${COLORS.ink50}"/>
    <circle cx="16" cy="22" r="3" fill="${COLORS.emerald}"/>
  </g>
</svg>`
}

// ---------- HTML renderers (for stuff that uses fonts) ----------

const FONT_LINK = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />`

// Logo lockup (mark + "Processly" wordmark). Used for marketing/header use.
// `tone`: 'light' (dark text on transparent) or 'dark' (light text on transparent).
function htmlLockup({ tone = 'light', width = 1024 } = {}) {
  const isDark = tone === 'dark'
  const fg = isDark ? COLORS.ink50 : COLORS.ink950
  const nodeColor = isDark ? COLORS.ink50 : COLORS.ink950
  const strokeColor = isDark ? COLORS.ink50 : COLORS.ink950
  // Mark height : font-size : letter-spacing tuned to feel balanced.
  const markPx = Math.round(width * 0.13)
  const fontPx = Math.round(width * 0.115)
  const gapPx = Math.round(width * 0.025)
  const padPx = Math.round(width * 0.04)
  const heightPx = markPx + padPx * 2
  return `<!doctype html>
<html><head><meta charset="utf-8" />${FONT_LINK}
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  .wrap {
    display: inline-flex; align-items: center; gap: ${gapPx}px;
    padding: ${padPx}px;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .mark { width: ${markPx}px; height: ${markPx}px; display: block; }
  .word {
    font-weight: 600;
    font-size: ${fontPx}px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${fg};
  }
</style></head>
<body>
  <div class="wrap" id="target">
    <svg class="mark" viewBox="0 0 32 32">
      <path d="M9 9 L16 22 M23 9 L16 22" stroke="${strokeColor}" stroke-width="1.6" stroke-linecap="round" opacity="0.55"/>
      <circle cx="9" cy="9" r="3" fill="${COLORS.iris}"/>
      <circle cx="23" cy="9" r="3" fill="${nodeColor}"/>
      <circle cx="16" cy="22" r="3" fill="${COLORS.emerald}"/>
    </svg>
    <span class="word">Processly</span>
  </div>
</body></html>`
}

// LinkedIn personal profile background at 1584x396.
// LinkedIn overlays the profile photo on the bottom-left (~280–360px circle,
// roughly centered around x≈300, y≈350 on desktop). Critical content stays in
// the top-center and right zones to remain visible across viewports.
function htmlLinkedInPersonal() {
  return `<!doctype html>
<html><head><meta charset="utf-8" />${FONT_LINK}
<style>
  html, body { margin: 0; padding: 0; }
  body {
    width: 1584px; height: 396px;
    background:
      radial-gradient(900px 360px at 78% 30%, rgba(91,91,214,0.24), transparent 60%),
      radial-gradient(700px 360px at 18% 80%, rgba(16,185,129,0.10), transparent 60%),
      ${COLORS.ink950};
    color: ${COLORS.ink50};
    font-family: 'Inter', system-ui, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .dots {
    position: absolute; inset: 0; opacity: 0.32;
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0);
    background-size: 26px 26px;
    -webkit-mask-image: linear-gradient(105deg, transparent 0%, black 30%, black 95%, transparent 100%);
            mask-image: linear-gradient(105deg, transparent 0%, black 30%, black 95%, transparent 100%);
  }
  .blob {
    position: absolute;
    width: 520px; height: 520px;
    right: -120px; top: -160px;
    background: rgba(91,91,214,0.34);
    filter: blur(100px);
    border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
  }
  /* DAG decoration anchored to the far right; doesn't compete with the headline */
  .graphic {
    position: absolute; right: 80px; top: 50%;
    width: 360px; height: 220px;
    transform: translateY(-50%);
    opacity: 0.95;
  }
  .graphic svg { width: 100%; height: 100%; }
  /* Content centered vertically in the upper-right safe zone */
  .content {
    position: absolute; left: 460px; top: 76px;
    max-width: 720px;
  }
  .lockup { display: inline-flex; align-items: center; gap: 16px; }
  .lockup svg { width: 44px; height: 44px; }
  .lockup .word {
    font-weight: 600;
    font-size: 38px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${COLORS.ink50};
  }
  .eyebrow {
    margin-top: 24px;
    font-size: 12px; font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${COLORS.iris300};
  }
  .eyebrow .dot {
    display: inline-block; width: 6px; height: 6px;
    background: ${COLORS.iris300}; border-radius: 999px;
    vertical-align: middle; margin-right: 10px; transform: translateY(-1px);
  }
  .headline {
    margin: 10px 0 0;
    font-size: 44px; font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: ${COLORS.ink50};
    white-space: nowrap;
  }
  .headline .italic {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    color: ${COLORS.iris300};
    margin-left: 8px;
  }
</style></head>
<body>
  <div class="dots"></div>
  <div class="blob"></div>

  <!-- Decorative DAG anchored to the right edge -->
  <div class="graphic">
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
      <g stroke="rgba(231,231,223,0.40)" stroke-width="1.5" stroke-linecap="round" fill="none">
        <path d="M40 60 L180 110" />
        <path d="M40 160 L180 110" />
        <path d="M180 110 L320 60" />
        <path d="M180 110 L320 160" />
      </g>
      <g stroke="${COLORS.iris300}" stroke-width="1.6" stroke-linecap="round" fill="none" opacity="0.85" stroke-dasharray="6 8">
        <path d="M40 60 L180 110 L320 160" />
      </g>
      <g>
        <circle cx="40" cy="60" r="13" fill="${COLORS.iris}"/>
        <circle cx="40" cy="160" r="13" fill="${COLORS.ink50}"/>
        <circle cx="180" cy="110" r="13" fill="${COLORS.emerald}"/>
        <circle cx="320" cy="60" r="13" fill="${COLORS.ink50}"/>
        <circle cx="320" cy="160" r="13" fill="${COLORS.iris}" opacity="0.9"/>
      </g>
    </svg>
  </div>

  <div class="content">
    <div class="lockup">
      <svg viewBox="0 0 32 32">
        <path d="M9 9 L16 22 M23 9 L16 22" stroke="${COLORS.ink50}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
        <circle cx="9" cy="9" r="3" fill="${COLORS.iris}"/>
        <circle cx="23" cy="9" r="3" fill="${COLORS.ink50}"/>
        <circle cx="16" cy="22" r="3" fill="${COLORS.emerald}"/>
      </svg>
      <span class="word">Processly</span>
    </div>

    <p class="eyebrow"><span class="dot"></span>Process &amp; project orchestration</p>
    <h1 class="headline">
      Design your work once.<span class="italic">Run it forever.</span>
    </h1>
  </div>
</body></html>`
}

// LinkedIn company page cover at 1128x191.
// Compact horizontal layout — logo overlay covers bottom-left, so logo
// in this cover sits at the visual center-left, away from the corner.
function htmlLinkedInCompany() {
  return `<!doctype html>
<html><head><meta charset="utf-8" />${FONT_LINK}
<style>
  html, body { margin: 0; padding: 0; }
  body {
    width: 1128px; height: 191px;
    background:
      radial-gradient(700px 220px at 78% 50%, rgba(91,91,214,0.22), transparent 60%),
      ${COLORS.ink950};
    color: ${COLORS.ink50};
    font-family: 'Inter', system-ui, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .dots {
    position: absolute; inset: 0; opacity: 0.32;
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0);
    background-size: 22px 22px;
    -webkit-mask-image: linear-gradient(105deg, transparent 20%, black 60%, transparent 100%);
            mask-image: linear-gradient(105deg, transparent 20%, black 60%, transparent 100%);
  }
  .blob {
    position: absolute;
    width: 320px; height: 320px;
    right: -80px; top: -100px;
    background: rgba(91,91,214,0.34);
    filter: blur(80px);
    border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
  }
  .frame {
    position: relative; z-index: 1;
    height: 100%;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 56px 0 280px; /* left padding clears the company logo overlay zone */
  }
  .copy { display: flex; flex-direction: column; gap: 6px; }
  .eyebrow {
    font-size: 11px; font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${COLORS.iris300};
  }
  .eyebrow .dot {
    display: inline-block; width: 6px; height: 6px;
    background: ${COLORS.iris300}; border-radius: 999px;
    vertical-align: middle; margin-right: 8px; transform: translateY(-1px);
  }
  .headline {
    margin: 0;
    font-size: 32px; font-weight: 500;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: ${COLORS.ink50};
  }
  .headline .italic {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    color: ${COLORS.iris300};
    margin-left: 6px;
  }
  .pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    font-size: 12px; font-weight: 500;
    color: ${COLORS.ink200};
    white-space: nowrap;
  }
  .pill .pdot {
    width: 6px; height: 6px; border-radius: 999px;
    background: ${COLORS.emerald};
    box-shadow: 0 0 0 3px rgba(16,185,129,0.18);
  }
</style></head>
<body>
  <div class="dots"></div>
  <div class="blob"></div>

  <div class="frame">
    <div class="copy">
      <p class="eyebrow"><span class="dot"></span>Process &amp; project orchestration</p>
      <h1 class="headline">
        Design your work once.<span class="italic">Run it forever.</span>
      </h1>
    </div>
    <span class="pill"><span class="pdot"></span>Visual workflows · live projects</span>
  </div>
</body></html>`
}

// OG / social share image at 1200x630.
// Dark hero: gradient background, subtle dot pattern, iris blob accent,
// lockup centered with tagline below.
function htmlOG() {
  return `<!doctype html>
<html><head><meta charset="utf-8" />${FONT_LINK}
<style>
  html, body { margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px;
    background:
      radial-gradient(1200px 420px at 78% 22%, rgba(91,91,214,0.18), transparent 60%),
      radial-gradient(900px 420px at 18% 88%, rgba(16,185,129,0.10), transparent 60%),
      ${COLORS.ink950};
    color: ${COLORS.ink50};
    font-family: 'Inter', system-ui, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .dots {
    position: absolute; inset: 0; opacity: 0.35;
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0);
    background-size: 28px 28px;
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
            mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }
  .blob {
    position: absolute;
    width: 540px; height: 540px;
    left: -120px; bottom: -160px;
    background: rgba(91,91,214,0.32);
    filter: blur(90px);
    border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
  }
  .frame {
    position: relative; z-index: 1;
    height: 100%;
    display: flex; flex-direction: column;
    padding: 72px 96px;
  }
  .lockup { display: inline-flex; align-items: center; gap: 22px; }
  .lockup svg { width: 60px; height: 60px; }
  .lockup .word {
    font-weight: 600;
    font-size: 56px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${COLORS.ink50};
  }
  .eyebrow {
    margin-top: 64px;
    font-size: 16px; font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${COLORS.iris300};
  }
  .eyebrow .dot {
    display: inline-block; width: 8px; height: 8px;
    background: ${COLORS.iris300}; border-radius: 999px;
    vertical-align: middle; margin-right: 12px; transform: translateY(-2px);
  }
  .headline {
    margin-top: 22px;
    font-size: 96px; font-weight: 500;
    line-height: 1.02;
    letter-spacing: -0.025em;
    color: ${COLORS.ink50};
    max-width: 1000px;
  }
  .headline .italic {
    display: block;
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    color: ${COLORS.iris300};
  }
  .footer {
    margin-top: auto;
    display: flex; justify-content: space-between; align-items: flex-end;
    color: ${COLORS.ink200};
    font-size: 18px;
  }
  .footer .tag {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 14px; letter-spacing: 0.06em;
    color: rgba(231,231,223,0.55);
  }
  .pill {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    font-size: 14px; font-weight: 500;
    color: ${COLORS.ink200};
  }
  .pill .pdot {
    width: 7px; height: 7px; border-radius: 999px;
    background: ${COLORS.emerald};
    box-shadow: 0 0 0 4px rgba(16,185,129,0.18);
  }
</style></head>
<body>
  <div class="dots"></div>
  <div class="blob"></div>
  <div class="frame">
    <div class="lockup">
      <svg viewBox="0 0 32 32">
        <path d="M9 9 L16 22 M23 9 L16 22" stroke="${COLORS.ink50}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
        <circle cx="9" cy="9" r="3" fill="${COLORS.iris}"/>
        <circle cx="23" cy="9" r="3" fill="${COLORS.ink50}"/>
        <circle cx="16" cy="22" r="3" fill="${COLORS.emerald}"/>
      </svg>
      <span class="word">Processly</span>
    </div>

    <p class="eyebrow"><span class="dot"></span>Process &amp; project orchestration</p>
    <h1 class="headline">
      Design your work once.
      <span class="italic">Run it forever.</span>
    </h1>

    <div class="footer">
      <span class="pill"><span class="pdot"></span>Visual workflows · live projects</span>
      <span class="tag">processly</span>
    </div>
  </div>
</body></html>`
}

// ---------- Targets ----------
// Each target: { file, kind: 'svg' | 'html', source, width, height? }
// For SVG kind, `width` is also the height (square).
// For HTML kind, the target dimensions match what the HTML produces.

const targets = [
  // ---- Browser favicons (transparent: dark mark on transparent) ----
  // Favicons traditionally have a background. Our app icon has rounded ink-950 bg.
  { file: 'favicon-16.png',          kind: 'svg', source: svgAppIcon(),     width: 16 },
  { file: 'favicon-32.png',          kind: 'svg', source: svgAppIcon(),     width: 32 },
  { file: 'favicon-48.png',          kind: 'svg', source: svgAppIcon(),     width: 48 },
  { file: 'favicon-64.png',          kind: 'svg', source: svgAppIcon(),     width: 64 },

  // ---- Apple touch icon (iOS home screen) ----
  { file: 'apple-touch-icon.png',    kind: 'svg', source: svgAppIcon(),     width: 180 },

  // ---- PWA / Android ----
  { file: 'icon-192.png',            kind: 'svg', source: svgAppIcon(),     width: 192 },
  { file: 'icon-512.png',            kind: 'svg', source: svgAppIcon(),     width: 512 },
  { file: 'icon-maskable-512.png',   kind: 'svg', source: svgMaskableIcon(), width: 512 },

  // ---- Bare brand mark (transparent bg, for light surfaces) ----
  { file: 'logo-mark-256.png',       kind: 'svg', source: svgMark(),         width: 256, transparent: true },
  { file: 'logo-mark-512.png',       kind: 'svg', source: svgMark(),         width: 512, transparent: true },
  { file: 'logo-mark-1024.png',      kind: 'svg', source: svgMark(),         width: 1024, transparent: true },

  // ---- Bare brand mark, dark-bg variant (light second node) ----
  { file: 'logo-mark-dark-256.png',  kind: 'svg', source: svgMark({ nodeColor: COLORS.ink50, strokeColor: COLORS.ink50 }), width: 256, transparent: true },
  { file: 'logo-mark-dark-512.png',  kind: 'svg', source: svgMark({ nodeColor: COLORS.ink50, strokeColor: COLORS.ink50 }), width: 512, transparent: true },

  // ---- Logo lockup (mark + Processly wordmark) ----
  { file: 'logo-lockup-512.png',     kind: 'html', source: htmlLockup({ tone: 'light', width: 512 }), transparent: true },
  { file: 'logo-lockup-1024.png',    kind: 'html', source: htmlLockup({ tone: 'light', width: 1024 }), transparent: true },
  { file: 'logo-lockup-dark-1024.png', kind: 'html', source: htmlLockup({ tone: 'dark', width: 1024 }), transparent: true },

  // ---- Open Graph / social share image ----
  { file: 'og-image.png',            kind: 'html-fixed', source: htmlOG(), width: 1200, height: 630 },

  // ---- LinkedIn covers ----
  { file: 'linkedin-cover-personal.png', kind: 'html-fixed', source: htmlLinkedInPersonal(), width: 1584, height: 396 },
  { file: 'linkedin-cover-company.png',  kind: 'html-fixed', source: htmlLinkedInCompany(),  width: 1128, height: 191 },
]

;(async () => {
  const browser = await chromium.launch()

  for (const t of targets) {
    if (t.kind === 'svg') {
      // Wrap SVG in HTML at exact pixel dimensions and screenshot.
      const ctx = await browser.newContext({
        viewport: { width: t.width, height: t.width },
        deviceScaleFactor: 1,
      })
      const page = await ctx.newPage()
      const bg = t.transparent ? 'transparent' : 'transparent' // SVG handles its own bg
      const html = `<!doctype html><html><head><meta charset="utf-8"/>
<style>
  html, body { margin: 0; padding: 0; background: ${bg}; }
  body { width: ${t.width}px; height: ${t.width}px; }
  svg { width: 100%; height: 100%; display: block; }
</style></head><body>${t.source}</body></html>`
      await page.setContent(html, { waitUntil: 'networkidle' })
      await page.screenshot({
        path: path.join(OUT, t.file),
        omitBackground: true,
        clip: { x: 0, y: 0, width: t.width, height: t.width },
      })
      await ctx.close()
      console.log(`✓ ${t.file} (${t.width}x${t.width})`)
    } else if (t.kind === 'html') {
      // HTML lockup — measure the rendered element, screenshot it directly.
      // Using a generous viewport; we screenshot the #target element.
      const ctx = await browser.newContext({
        viewport: { width: 2000, height: 800 },
        deviceScaleFactor: 1,
      })
      const page = await ctx.newPage()
      await page.setContent(t.source, { waitUntil: 'networkidle' })
      // Wait for fonts
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready
      })
      await page.waitForTimeout(200)
      const el = page.locator('#target')
      await el.screenshot({
        path: path.join(OUT, t.file),
        omitBackground: true,
      })
      await ctx.close()
      console.log(`✓ ${t.file}`)
    } else if (t.kind === 'html-fixed') {
      // OG image: render at exact dimensions and screenshot full viewport.
      const ctx = await browser.newContext({
        viewport: { width: t.width, height: t.height },
        deviceScaleFactor: 1,
      })
      const page = await ctx.newPage()
      await page.setContent(t.source, { waitUntil: 'networkidle' })
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready
      })
      await page.waitForTimeout(300)
      await page.screenshot({
        path: path.join(OUT, t.file),
        clip: { x: 0, y: 0, width: t.width, height: t.height },
      })
      await ctx.close()
      console.log(`✓ ${t.file} (${t.width}x${t.height})`)
    }
  }

  await browser.close()
  console.log('\nAll assets written to: ' + OUT)
})()
