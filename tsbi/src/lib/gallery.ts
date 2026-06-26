/* Static manifest of /public/about us/galary web images.
   Generated build-time — do NOT read the filesystem here: a runtime fs scan makes
   Next.js bundle the whole gallery folder into the serverless function (250MB limit).
   To refresh after adding/removing photos, run: node scripts/gallery.gen.mjs */
export interface GalleryImage { src: string; event: string; name: string; }

export const galleryImages: GalleryImage[] = [
  {"src":"/about%20us/galary/12th%20party/AR-10.jpg","event":"12th party","name":"AR-10.jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-13.jpg","event":"12th party","name":"AR-13.jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-16.jpg","event":"12th party","name":"AR-16.jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-17.jpg","event":"12th party","name":"AR-17.jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-2.jpg","event":"12th party","name":"AR-2.jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-23%20(1).jpg","event":"12th party","name":"AR-23 (1).jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-26.jpg","event":"12th party","name":"AR-26.jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-35.jpg","event":"12th party","name":"AR-35.jpg"},
  {"src":"/about%20us/galary/12th%20party/AR-6.jpg","event":"12th party","name":"AR-6.jpg"},
  {"src":"/about%20us/galary/Coke%20Event/DSC00922.JPG","event":"Coke Event","name":"DSC00922.JPG"},
  {"src":"/about%20us/galary/Coke%20Event/DSC00923.JPG","event":"Coke Event","name":"DSC00923.JPG"},
  {"src":"/about%20us/galary/Coke%20Event/DSC00924.JPG","event":"Coke Event","name":"DSC00924.JPG"},
  {"src":"/about%20us/galary/Coke%20Event/DSC00925.JPG","event":"Coke Event","name":"DSC00925.JPG"},
  {"src":"/about%20us/galary/Fluid%20Art/IMG_8335.jpg","event":"Fluid Art","name":"IMG_8335.jpg"},
  {"src":"/about%20us/galary/Fluid%20Art/IMG_8336.jpg","event":"Fluid Art","name":"IMG_8336.jpg"},
  {"src":"/about%20us/galary/Fluid%20Art/IMG_8344.jpg","event":"Fluid Art","name":"IMG_8344.jpg"},
  {"src":"/about%20us/galary/Fluid%20Art/IMG_8345.jpg","event":"Fluid Art","name":"IMG_8345.jpg"},
  {"src":"/about%20us/galary/Fluid%20Art/IMG_8367.jpg","event":"Fluid Art","name":"IMG_8367.jpg"},
  {"src":"/about%20us/galary/Fluid%20Art/IMG_8368.jpg","event":"Fluid Art","name":"IMG_8368.jpg"},
  {"src":"/about%20us/galary/Hallowwen/thumbnail.JPG","event":"Hallowwen","name":"thumbnail.JPG"},
  {"src":"/about%20us/galary/Mother's%20Day%2025%20%26%2026/IMG_4152.jpg","event":"Mother's Day 25 & 26","name":"IMG_4152.jpg"},
  {"src":"/about%20us/galary/Mother's%20Day%2025%20%26%2026/IMG_4179.jpg","event":"Mother's Day 25 & 26","name":"IMG_4179.jpg"},
  {"src":"/about%20us/galary/Mother's%20Day%2025%20%26%2026/IMG_8977.jpg","event":"Mother's Day 25 & 26","name":"IMG_8977.jpg"},
  {"src":"/about%20us/galary/Mother's%20Day%2025%20%26%2026/WhatsApp%20Image%202025-05-09%20at%206.18.01%20PM.jpeg","event":"Mother's Day 25 & 26","name":"WhatsApp Image 2025-05-09 at 6.18.01 PM.jpeg"},
  {"src":"/about%20us/galary/Onam%2025/IMG_4163.jpg","event":"Onam 25","name":"IMG_4163.jpg"},
  {"src":"/about%20us/galary/Onam%2025/IMG_4172.jpg","event":"Onam 25","name":"IMG_4172.jpg"},
  {"src":"/about%20us/galary/Onam%2025/IMG_4214.jpg","event":"Onam 25","name":"IMG_4214.jpg"},
];

export function getGalleryImages(): GalleryImage[] {
  return galleryImages;
}
