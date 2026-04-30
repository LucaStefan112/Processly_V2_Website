// Responsive validation across multiple viewports.
// - Captures full-page + per-section screenshots
// - Detects horizontal overflow elements (the #1 mobile bug)
// - Reports console / page errors

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

const viewports = [
  { label: 'mobile-sm', width: 360, height: 780, isMobile: true },   // small Android
  { label: 'mobile-md', width: 390, height: 844, isMobile: true },   // iPhone 13/14
  { label: 'mobile-lg', width: 430, height: 932, isMobile: true },   // iPhone 15 Pro Max
  { label: 'tablet-p', width: 768, height: 1024, isMobile: false },  // iPad portrait
  { label: 'tablet-l', width: 1024, height: 768, isMobile: false },  // iPad landscape
  { label: 'desktop',  width: 1280, height: 800, isMobile: false },
  { label: 'wide',     width: 1536, height: 960, isMobile: false },
]

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight
    const vh = window.innerHeight
    const step = Math.max(200, Math.floor(vh / 3))
    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(300)
}

async function detectOverflow(page) {
  // Find elements wider than the viewport, ignoring elements that are themselves
  // intentionally scrollable (overflow-x: auto/scroll).
  return await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const docOverflow = document.documentElement.scrollWidth - vw
    const offenders = []
    const all = document.body.querySelectorAll('*')
    for (const el of all) {
      const rect = el.getBoundingClientRect()
      const right = rect.right
      const left = rect.left
      if (right > vw + 1 || left < -1) {
        const cs = window.getComputedStyle(el)
        // skip elements that are scroll containers
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowX === 'hidden') continue
        // Skip fixed/absolute decorative blurs that are explicitly clipped by ancestor
        const tag = el.tagName.toLowerCase()
        const cls = (el.className || '').toString().slice(0, 80)
        offenders.push({
          tag,
          cls,
          left: Math.round(left),
          right: Math.round(right),
          width: Math.round(rect.width),
          vw,
        })
        if (offenders.length >= 25) break
      }
    }
    return { docOverflow, offenders }
  })
}

async function snapEachSection(page, label) {
  for (const id of sectionIds) {
    const el = page.locator(`#${id}`).first()
    if (!(await el.count())) continue
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    try {
      await el.screenshot({ path: path.join(OUT, `${label}-section-${id}.png`) })
    } catch (e) {
      // tall sections sometimes exceed screenshot limits; skip silently
    }
  }
}

;(async () => {
  const browser = await chromium.launch()
  const report = []
  const allErrors = []

  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.isMobile ? 2 : 1,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    })
    const page = await ctx.newPage()
    const errs = []
    page.on('pageerror', (e) => errs.push(`${vp.label} pageerror: ${e.message}`))
    page.on('console', (m) => {
      if (m.type() === 'error') errs.push(`${vp.label} console.error: ${m.text()}`)
    })

    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)
    await scrollThrough(page)

    // Full-page screenshot at top
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(200)
    await page.screenshot({
      path: path.join(OUT, `${vp.label}-full.png`),
      fullPage: true,
    })

    await snapEachSection(page, vp.label)

    // Test mobile menu open at mobile viewports
    if (vp.isMobile) {
      const burger = page.locator('button[aria-label="Open menu"]').first()
      if (await burger.count()) {
        await burger.click()
        await page.waitForTimeout(300)
        await page.screenshot({
          path: path.join(OUT, `${vp.label}-menu-open.png`),
          fullPage: false,
        })
        const close = page.locator('button[aria-label="Close menu"]').first()
        if (await close.count()) await close.click()
        await page.waitForTimeout(200)
      }
    }

    // Overflow detection at multiple scroll positions
    const overflowReports = []
    for (const frac of [0, 0.25, 0.5, 0.75, 0.95]) {
      await page.evaluate((f) => {
        const total = document.documentElement.scrollHeight - window.innerHeight
        window.scrollTo(0, Math.floor(total * f))
      }, frac)
      await page.waitForTimeout(250)
      const r = await detectOverflow(page)
      overflowReports.push({ frac, ...r })
    }

    report.push({
      vp: vp.label,
      width: vp.width,
      height: vp.height,
      errors: errs,
      overflow: overflowReports,
    })
    allErrors.push(...errs)
    await ctx.close()
  }

  await browser.close()

  console.log('\n=== RESPONSIVE REPORT ===\n')
  for (const r of report) {
    console.log(`-- ${r.vp} (${r.width}x${r.height}) --`)
    if (r.errors.length) {
      console.log(`  errors:`)
      r.errors.forEach((e) => console.log(`    - ${e}`))
    }
    let anyOverflow = false
    for (const o of r.overflow) {
      if (o.docOverflow > 0 || o.offenders.length) {
        anyOverflow = true
        console.log(`  scroll=${o.frac} docOverflow=${o.docOverflow}px offenders=${o.offenders.length}`)
        o.offenders.slice(0, 10).forEach((x) =>
          console.log(`    * <${x.tag}> [${x.cls}] left=${x.left} right=${x.right} w=${x.width} vw=${x.vw}`),
        )
      }
    }
    if (!anyOverflow) console.log(`  no horizontal overflow detected`)
    console.log('')
  }
  console.log(`screenshots in: ${OUT}`)
  process.exit(allErrors.length > 0 ? 1 : 0)
})()
