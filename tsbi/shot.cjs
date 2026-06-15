const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--hide-scrollbars'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2', timeout: 60000 });

  const sel = '[aria-label="Leadership"]';
  await page.waitForSelector(sel, { timeout: 30000 });
  // Scroll through the whole page in steps so every whileInView animation fires.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
  });
  await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'start' }), sel);
  await new Promise((r) => setTimeout(r, 800));

  // log layout metrics for diagnosis
  const metrics = await page.evaluate((s) => {
    const sec = document.querySelector(s);
    const inner = sec.querySelector(':scope > div.relative');
    const r = sec.getBoundingClientRect();
    const ir = inner ? inner.getBoundingClientRect() : null;
    return {
      viewport: { w: window.innerWidth },
      section: { left: r.left, width: r.width },
      inner: ir ? { left: ir.left, width: ir.width, marginLeft: getComputedStyle(inner).marginLeft, marginRight: getComputedStyle(inner).marginRight, maxWidth: getComputedStyle(inner).maxWidth } : null,
    };
  }, sel);
  console.log(JSON.stringify(metrics, null, 2));

  const out = path.join(os.tmpdir(), 'lead_section.png');
  const el = await page.$(sel);
  await el.screenshot({ path: out });
  console.log('SAVED', out);
  await browser.close();
})();
