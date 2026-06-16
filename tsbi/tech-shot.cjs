const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1440, height: 1000 },
    args: ['--hide-scrollbars'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

  // 1) Digital Transformation page
  await page.goto('http://localhost:3000/services/digital-transformation', { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise((r) => setTimeout(r, 800));
  const dtTop = path.join(os.tmpdir(), 'dt_top.png');
  await page.screenshot({ path: dtTop });
  console.log('SAVED', dtTop);
  // scroll to Selected Work
  await page.evaluate(() => { const els=[...document.querySelectorAll('h2')]; const t=els.find(e=>e.textContent.includes('Selected Work')); if(t) t.scrollIntoView({block:'start'}); });
  await new Promise((r) => setTimeout(r, 600));
  const dtWork = path.join(os.tmpdir(), 'dt_work.png');
  await page.screenshot({ path: dtWork });
  console.log('SAVED', dtWork);
  const imgCount = await page.evaluate(() => [...document.querySelectorAll('img')].filter(i=>i.src.includes('/tech/')).length);
  console.log('tech images on DT page:', imgCount);

  // 2) A tech case study detail
  await page.goto('http://localhost:3000/case-studies/lipton-squid-game', { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise((r) => setTimeout(r, 600));
  const csImpact = await page.evaluate(() => document.body.innerText.includes('29,752'));
  console.log('case study shows impact stat:', csImpact);
  const cs = path.join(os.tmpdir(), 'cs_lipton.png');
  await page.screenshot({ path: cs, fullPage: false });
  console.log('SAVED', cs);
  // scroll mid to capture rich sections
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await new Promise((r) => setTimeout(r, 500));
  const cs2 = path.join(os.tmpdir(), 'cs_lipton_mid.png');
  await page.screenshot({ path: cs2 });
  console.log('SAVED', cs2);

  console.log('ERRORS:', errors.length);
  errors.slice(0, 20).forEach((e) => console.log(' -', e));
  await browser.close();
})().catch((e) => { console.error('FAILED', e); process.exit(1); });
