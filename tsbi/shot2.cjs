const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');

const targets = [
  { url: 'http://localhost:3000/', name: 'home' },
  { url: 'http://localhost:3000/contact', name: 'contact' },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--hide-scrollbars'],
  });
  for (const t of targets) {
    const page = await browser.newPage();
    await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1200));
    const out = path.join(os.tmpdir(), `chk_${t.name}.png`);
    await page.screenshot({ path: out });
    console.log('SAVED', t.name, out);
    await page.close();
  }
  await browser.close();
})();
