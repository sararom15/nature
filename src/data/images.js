import { getImage } from 'astro:assets';

const files = import.meta.glob('../assets/*.{jpg,png}', { eager: true, import: 'default' });

/** Restituisce i metadati dell'immagine originale in src/assets. */
export function asset(name) {
  const file = files[`../assets/${name}`];
  if (!file) throw new Error(`Immagine mancante: ${name}`);
  return file;
}

/** Genera le versioni WebP ridimensionate e restituisce src + srcset. */
export async function optimized(name, widths = [480, 800, 1200, 1600, 2048]) {
  const src = asset(name);
  const list = widths.filter((w) => w < src.width);
  list.push(Math.min(src.width, Math.max(...widths)));
  const img = await getImage({ src, widths: [...new Set(list)], format: 'webp' });
  return { src: img.src, srcset: img.srcSet.attribute };
}
