// Validate both EN and RO at desktop + mobile.
// - Captures full pages and per-section snapshots for each language.
// - Detects horizontal overflow (RO is longer; this is the main risk).

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
  { label: 'mobile-sm', width: 360, height: 780, isMobile: true },
  { label: 'tablet-p', width: 768, height: 1024, isMobile: false },
  { label: 'desktop',  width: 1280, height: 800, isMobile: false },
]

async function setLang(page, lang) {
  await page.evaluate((l) => {
    window.localStorage.setItem('processly.lang', l)
  }, lang)
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  // verify lang is set on <html>
  const got = await page.evaluate(() => document.documentElement.lang)
  if (got !== lang) throw new Error(`expected lang=${lang}, got ${got}`)
}

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
  return await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const docOverflow = document.documentElement.scrollWidth - vw
    return { docOverflow, vw }
  })
}

async function snapEachSection(page, label) {
  for (const id of sectionIds) {
    const el = page.locator(`#${id}`).first()
    if (!(await el.count())) continue
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    try {
      await el.screenshot({ path: path.join(OUT, `${label}-section-${id}.png`) })
    } catch (e) {}
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

    for (const lang of ['en', 'ro']) {
      // Set lang BEFORE first navigation by using initial localStorage
      await page.goto(URL, { waitUntil: 'networkidle' })
      await setLang(page, lang)
      await scrollThrough(page)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(200)

      const fullLabel = `${vp.label}-${lang}`
      await page.screenshot({
        path: path.join(OUT, `${fullLabel}-full.png`),
        fullPage: true,
      })
      await snapEachSection(page, fullLabel)

      const o = await detectOverflow(page)
      report.push({ vp: vp.label, lang, ...o, errors: [...errs] })
    }

    allErrors.push(...errs)
    await ctx.close()
  }

  await browser.close()

  console.log('\n=== I18N RESPONSIVE REPORT ===')
  for (const r of report) {
    console.log(`-- ${r.vp} (${r.vw}px) [${r.lang.toUpperCase()}] docOverflow=${r.docOverflow}px`)
  }
  if (allErrors.length) {
    console.log('\nERRORS:')
    allErrors.forEach((e) => console.log('  - ' + e))
  } else {
    console.log('\nNo console / page errors.')
  }
  console.log(`\nscreenshots in: ${OUT}`)
  process.exit(allErrors.length > 0 ? 1 : 0)
})()
