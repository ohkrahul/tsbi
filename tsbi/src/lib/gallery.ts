import fs from 'node:fs';
import path from 'node:path';

/* Browser-renderable formats only. HEIC (.heic) and Sony RAW (.arw) are skipped
   because no browser can display them — export those to .jpg and they appear automatically. */
const WEB_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

export interface GalleryImage {
  src: string;    // public URL (path segments URL-encoded)
  event: string;  // subfolder name it came from
  name: string;   // file name
}

/** URL-encode each path segment of a public-relative path. */
function toPublicUrl(relFromPublic: string): string {
  return '/' + relFromPublic.split(path.sep).map(encodeURIComponent).join('/');
}

/**
 * Recursively collect every web-displayable image under /public/about us/galary,
 * tagged with the event (subfolder) it belongs to. Runs on the server (fs).
 */
export function getGalleryImages(): GalleryImage[] {
  const publicDir = path.join(process.cwd(), 'public');
  const root = path.join(publicDir, 'about us', 'galary');
  const out: GalleryImage[] = [];

  const walk = (dir: string, event: string) => {
    let items: fs.Dirent[];
    try {
      items = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const it of items) {
      const full = path.join(dir, it.name);
      if (it.isDirectory()) {
        walk(full, it.name); // each subfolder becomes the event label
      } else if (WEB_EXT.has(path.extname(it.name).toLowerCase())) {
        out.push({
          src: toPublicUrl(path.relative(publicDir, full)),
          event: event || 'TSBI',
          name: it.name,
        });
      }
    }
  };

  walk(root, 'TSBI');

  // stable order: event, then file name
  out.sort((a, b) => a.event.localeCompare(b.event) || a.name.localeCompare(b.name));
  return out;
}
