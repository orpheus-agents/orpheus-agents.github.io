// Draws the images for link previews: docs/public/og-ru.png and docs/public/og-en.png.
// The card repeats the first screen of the site: the title on a sheet of strings with
// the relief of the mark. The strings come from the same engine as on the site.
// Run `npm run og` after the first screen, the fonts or the logo change.
import { readFileSync } from 'node:fs'
import { transform } from 'esbuild'
import { chromium } from '@playwright/test'

const WIDTH = 1200
const HEIGHT = 630
const cards = [
  { file: 'og-ru.png', lang: 'ru', title: ['Платформа', 'AI-агентов', 'компании'] },
  { file: 'og-en.png', lang: 'en', title: ['AI agents', 'for your', 'company'] },
]

const read = path => readFileSync(new URL(`../${path}`, import.meta.url))
const embed = (path, type) => `data:${type};base64,${read(path).toString('base64')}`
const engine = (await transform(read('docs/.vitepress/theme/home/strings.ts').toString(), { loader: 'ts', format: 'esm' })).code

const page = card => `<!doctype html>
<html lang="${card.lang}">
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Martian Grotesk';
    src: url('${embed('docs/public/fonts/MartianGroteskSemiExpanded-ExtraBold.woff2', 'font/woff2')}') format('woff2');
    font-weight: 800;
  }
  * { margin: 0; box-sizing: border-box; }
  body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  main {
    --bg: #0e0e10;
    --line: #2c2c30;
    --ink: #ededeb;
    --accent: #4ef2aa;
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    padding: 64px 72px;
    background: var(--bg);
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
  canvas { position: absolute; top: 0; left: 0; }
  img, h1, p { position: relative; display: block; }
  img { height: 36px; }
  h1 { margin-top: 92px; font: 800 86px/1 'Martian Grotesk', sans-serif; letter-spacing: -0.04em; white-space: nowrap; }
  p { position: absolute; left: 72px; bottom: 60px; font-size: 26px; color: #a49d94; }
</style>
<main>
  <canvas></canvas>
  <img src="${embed('docs/public/brand/orpheus-logo.svg', 'image/svg+xml')}" alt="">
  <h1>${card.title.join('<br>')}</h1>
  <p>orpheus-agents.github.io</p>
</main>
<script type="module">
  ${engine}
  await document.fonts.ready
  const host = document.querySelector('main')
  createStrings(document.querySelector('canvas'), host, {
    relief: () => ({ x: 932, y: 328, size: 206 }),
    fade: () => ({ stops: [[0, 0.35], [0.5, 0.45], [0.62, 1]] }),
    traffic: 6,
  })
  document.body.dataset.ready = 'true'
</script>`

const browser = await chromium.launch()
try {
  const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 })
  for (const card of cards) {
    const tab = await context.newPage()
    await tab.setContent(page(card))
    await tab.waitForSelector('body[data-ready]')
    await tab.screenshot({ path: new URL(`../docs/public/${card.file}`, import.meta.url).pathname, type: 'png' })
    await tab.close()
    console.log(`docs/public/${card.file}`)
  }
} finally {
  await browser.close()
}
