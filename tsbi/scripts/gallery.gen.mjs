// Regenerates src/lib/gallery.ts — a STATIC manifest of the web images under
// /public/about us/galary. Run after adding/removing gallery photos:
//
//   node scripts/gallery.gen.mjs
//
// Why static (no runtime fs): reading the directory at request time makes
// Next.js trace the entire gallery folder into the /about serverless function,
// which blows past Vercel's 250MB function-size limit.
import fs from 'node:fs';
import path from 'node:path';

const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const VID = new Set(['.mp4', '.webm', '.mov', '.m4v']);
// Nicer captions for otherwise raw dump-folder names (event defaults to the folder name).
const PRETTY = { newImg: 'Moments' };
const cwd = process.cwd();
const pub = path.join(cwd, 'public');
const root = path.join(pub, 'about us', 'galary');

const toUrl = (relFromPublic) => '/' + relFromPublic.split(path.sep).map(encodeURIComponent).join('/');

const out = [];
const walk = (dir, event) => {
  for (const it of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) walk(full, it.name);
    else {
      const ext = path.extname(it.name).toLowerCase();
      const type = IMG.has(ext) ? 'image' : VID.has(ext) ? 'video' : null;
      if (type) out.push({ src: toUrl(path.relative(pub, full)), event: PRETTY[event] ?? event, type, name: it.name });
    }
  }
};
walk(root, 'TSBI');
out.sort((a, b) => a.event.localeCompare(b.event) || a.name.localeCompare(b.name));

const body = out.map((o) => '  ' + JSON.stringify(o) + ',').join('\n');
const file = `/* Static manifest of /public/about us/galary web images.
   Generated build-time — do NOT read the filesystem here: a runtime fs scan makes
   Next.js bundle the whole gallery folder into the serverless function (250MB limit).
   To refresh after adding/removing photos, run: node scripts/gallery.gen.mjs */
export interface GalleryImage { src: string; event: string; type: 'image' | 'video'; name: string; }

export const galleryImages: GalleryImage[] = [
${body}
];

export function getGalleryImages(): GalleryImage[] {
  return galleryImages;
}
`;
fs.writeFileSync(path.join(cwd, 'src', 'lib', 'gallery.ts'), file);
console.log(`Wrote src/lib/gallery.ts with ${out.length} entries.`);
