# Nature — sito in Astro

Migrazione ad [Astro](https://astro.build) del sito che si trova in `../dist`. Grafica, testi e comportamento sono invariati; cambiano la struttura e le prestazioni.

## Comandi

Richiede Node.js 18.20 o successivo.

```sh
npm install        # una volta sola
npm run dev        # sviluppo con anteprima live su http://localhost:4321
npm run build      # genera il sito statico in dist/
npm run preview    # prova in locale il sito generato
```

Per pubblicare, carica il contenuto di `dist/` su un hosting statico (Netlify, Vercel, Cloudflare Pages…), oppure collega la cartella al servizio con comando di build `npm run build` e cartella di output `dist`.
Il sito generato va servito da un server web: aprire `dist/index.html` con doppio clic non funziona, perché i percorsi partono dalla radice del sito (`/`).

## Struttura

- `src/pages/`: una pagina per file (`index`, `progetto`, `azienda`, `pasta`, `professionisti`, `box`, `contatti`). Ognuna diventa un indirizzo reale, per esempio `/pasta/`.
- `src/layouts/Layout.astro`: parti comuni (fascia superiore, header, menu, footer, scheda prodotto).
- `src/components/`: blocchi riutilizzati (griglia formati, box, pulsanti, intestazioni…).
- `src/data/site.js`: **formati di pasta, box e prezzi, voci di menu, titoli delle pagine, dati aziendali (ragione sociale, P.IVA, indirizzo, telefono, email), link Google Maps e social**. Per cambiare questi contenuti si modifica soltanto questo file.
  - Social: quando le pagine Instagram e Facebook saranno attive, inserisci l'indirizzo nel campo `url` di `social`. Il segnaposto (icona e nome, per ora non cliccabili) diventa da solo un link vero, in tutto il sito.
- `src/styles/contacts.css`: stili del footer e della pagina Contatti.
- `src/assets/`: fotografie originali. In fase di build vengono convertite in WebP in più dimensioni.
- `public/assets/`: loghi e mappa, copiati così come sono.
- `src/styles/style.css`: il foglio di stile originale, invariato (tolto solo il caricamento dei font da Google).
- `src/scripts/`: menu, header, scheda prodotto (`site.js`) e modulo contatti (`contact-form.js`).

## Differenze rispetto alla versione precedente

- Pagine HTML reali invece di contenuti generati da JavaScript: Google le indicizza separatamente.
- Immagini ottimizzate: la home passa da circa 5,2 MB a circa 0,3 MB.
- Font DM Sans e Italiana ospitati sul sito: nessuna richiesta a Google Fonts.
- I vecchi indirizzi del tipo `/#/pasta` vengono reindirizzati alla nuova pagina `/pasta/`.

## Note

- Il modulo contatti prepara un'email per `az.agricolaromano@outlook.it`, che il visitatore invia dal proprio programma di posta: il sito non invia dati.
- Google Maps è collegato tramite link e non con una mappa incorporata: così non si caricano cookie di Google e non serve un banner per il consenso.
- Il sito non ha ancora favicon, sitemap e anteprima per i social.
