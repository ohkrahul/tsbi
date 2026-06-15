const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--hide-scrollbars', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('CONSOLE ' + m.text());
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

  await page.goto('http://localhost:3000/about/journey', { waitUntil: 'networkidle2', timeout: 90000 });

  // Entry overlay should be present.
  await page.waitForSelector('.jentry-cta', { timeout: 30000 });
  const entryShot = path.join(os.tmpdir(), 'journey_entry.png');
  await page.screenshot({ path: entryShot });
  console.log('SAVED', entryShot);

  // Enter the journey -> fall -> landing -> map.
  await page.click('.jentry-cta');
  await new Promise((r) => setTimeout(r, 6000)); // let fall+landing+map intro play

  const mapHud = await page.$('.jhud');
  console.log('HUD present after intro:', !!mapHud);
  const milestoneCard = await page.$('.jcard');
  console.log('Milestone card open:', !!milestoneCard);

  const mapShot = path.join(os.tmpdir(), 'journey_map.png');
  await page.screenshot({ path: mapShot });
  console.log('SAVED', mapShot);

  // Close the card to reveal the trail + markers + avatar, and advance once.
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 900));
  const openShot = path.join(os.tmpdir(), 'journey_open.png');
  await page.screenshot({ path: openShot });
  console.log('SAVED', openShot);

  console.log('ERRORS:', errors.length);
  errors.slice(0, 25).forEach((e) => console.log(' -', e));

  await browser.close();
})().catch((e) => {
  console.error('SCRIPT FAILED', e);
  process.exit(1);
});
