// Regenerate the 6 "Our Services" card images with Gemini.
// Needs GEMINI_API_KEY (env or .env) and available AI Studio quota.
// Run from the project root:  node scripts/gen-service-images.mjs
import { readFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const KEY = process.env.GEMINI_API_KEY
  || readFileSync('.env', 'utf8').match(/^GEMINI_API_KEY=(.+)$/m)?.[1]?.trim();
if (!KEY) throw new Error('GEMINI_API_KEY not found (env or .env)');

const OUT = 'public/services';
mkdirSync(OUT, { recursive: true });

const STYLE =
  ' Dark premium background (#0a0e1a deep navy), electric blue and subtle magenta neon glow, '
  + 'cinematic studio lighting, ultra-detailed 3D render, glossy high-end tech aesthetic, '
  + 'vertical portrait composition, no text, no watermark, no logo.';

const CARDS = [
  ['01', 'A hand holding a smartphone with a glowing social feed UI, floating 3D like, heart and comment icons around it.'],
  ['02', 'A sleek laptop screen showing a glowing analytics dashboard with rising line charts, bar graphs and a donut chart.'],
  ['03', 'A professional cinema camera rig on a film set with a glowing viewfinder monitor, blue rim light.'],
  ['04', 'A young female content creator smiling and holding a smartphone in front of a ring light, floating 3D engagement icons.'],
  ['05', 'A large glowing magnifying glass hovering over the letters "SEO", with a rising search-ranking bar graph behind it.'],
  ['06', 'A hand holding a smartphone projecting holographic e-commerce icons — a shopping cart, a cloud and a globe — connected by glowing lines.'],
];

const MODEL = 'gemini-2.5-flash-image';

async function gen(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    }),
  });
  if (!res.ok) throw new Error(`${MODEL} -> ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error('no image in response');
  return Buffer.from(part.inlineData.data, 'base64');
}

for (const [num, subject] of CARDS) {
  process.stdout.write(`Generating ${num}... `);
  const raw = await gen(subject + STYLE);
  await sharp(raw).resize({ width: 900, withoutEnlargement: true }).png().toFile(`${OUT}/${num}.png`);
  console.log('ok');
}
console.log('done ->', OUT);
