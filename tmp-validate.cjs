// Headless browser validation — scrolls progressively so IntersectionObservers fire.
const path = require('path')
const fs = require('fs')

const playwrightPath = path.resolve('c:/Projects/Processly_V2/node_modules/playwright')
const { chromium } = require(playwrightPath)

const URL = 'http://localhost:4173/'
const OUT = path.resolve(__dirname, 'tmp-screenshots')
fs.mkdirSync(OUT, { recursive: true })

const sectionIds = [
  'top',
  'problem',
  'solution',
  'features',
  'how-it-works',
  'showcase',
  'use-cases',
  'architecture',
  'benefits',
  'cta',
]

async function scrollThroughAndScreenshot(page, label) {
  // Scroll progressively to trigger viewport observers, pausing for animations.
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight
    const viewportH = window.innerHeight
    const step = Math.max(200, Math.floor(viewportH / 3))
    for (let y = 0; y <= totalHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 80))
    }
    window.scrollTo(0, 0)
  })
  // Let final state settle
  await page.waitForTimeout(400)
  await page.screenshot({
    path: path.join(OUT, `${label}-full-after-scroll.png`),
    fullPage: true,
  })
}

async function snapEachSection(page, label) {
  for (const id of sectionIds) {
    const el = page.locator(`#${id}`).first()
    if (!(await el.count())) continue
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(700) // let stagger animations finish
    await el.screenshot({ path: path.join(OUT, `${label}-section-${id}.png`) })
  }
}

;(async () => {
  const browser = await chromium.launch()
  const errors = []
  const consoleErrors = []

  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const dpage = await desktop.newPage()
  dpage.on('pageerror', (e) => errors.push(`DESKTOP pageerror: ${e.message}`))
  dpage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`DESKTOP console.error: ${msg.text()}`)
  })

  await dpage.goto(URL, { waitUntil: 'networkidle' })
  await dpage.waitForTimeout(600)

  await scrollThroughAndScreenshot(dpage, 'desktop')
  await snapEachSection(dpage, 'desktop')

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  const mpage = await mobile.newPage()
  mpage.on('pageerror', (e) => errors.push(`MOBILE pageerror: ${e.message}`))
  mpage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`MOBILE console.error: ${msg.text()}`)
  })

  await mpage.goto(URL, { waitUntil: 'networkidle' })
  await mpage.waitForTimeout(600)

  await scrollThroughAndScreenshot(mpage, 'mobile')
  await snapEachSection(mpage, 'mobile')

  await browser.close()

  console.log('=== VALIDATION REPORT ===')
  console.log(`Errors: ${errors.length}`)
  errors.forEach((e) => console.log('  - ' + e))
  console.log(`Console errors: ${consoleErrors.length}`)
  consoleErrors.forEach((e) => console.log('  - ' + e))
  console.log(`Screenshots in: ${OUT}`)
  process.exit(errors.length > 0 ? 1 : 0)
})()
