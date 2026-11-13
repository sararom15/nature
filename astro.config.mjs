// @ts-check
import { defineConfig } from 'astro/config';

// Sito statico: ogni pagina diventa un file HTML in dist/.
export default defineConfig({
  build: { format: 'directory' },
  trailingSlash: 'ignore',
});
