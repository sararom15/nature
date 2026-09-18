# Nature — prova fotografie della collezione

## Scelta proposta

Usare una **confezione con etichetta come prima immagine**, in un riquadro verticale **4:5**, e una **macro della pasta come seconda immagine**, accessibile anche al tocco su telefono. La confezione comunica identità; il dettaglio rende visibili superficie e lavorazione.

La selezione riguarda la resa fotografica: calamarata, linguine ed esagoni sono i tre campioni del test, non una proposta di riduzione del catalogo.

| Uso | Calamarata | Linguine | Esagoni | Motivo |
| --- | --- | --- | --- | --- |
| Prima foto | `Calamarata/0003.jpg` | `Linguine/0012 - a.jpg` | `Esagoni/0003.jpeg` | Confezione e marchio riconoscibili. 0012-a mantiene una buona consistenza visiva. |
| Seconda foto | `Calamarata/0004.jpg` | `Linguine/0014 - a.jpg` | `Esagoni/0004.jpeg` | La superficie della pasta è ben visibile. |
| Vista aggiuntiva | `Calamarata/0001.jpg` | `Linguine/0010 - a.jpg` | `Esagoni/0001.jpeg` | Mostra il formato attraverso la confezione trasparente. |

Per le linguine, confrontare anche `0006 - a` con `0010 - a`: la luce posteriore crea profondità, mentre le due luci anteriori laterali sono una base interessante per una serie uniforme. `0013 - a` è una possibile vista di tre quarti.

Per gli esagoni, `0001` rende più visibili pezzi e aperture rispetto alla vista laterale `0002`. La macro `0004` mostra bene superficie e sezione. Tutti e quattro i file hanno annotazioni incorporate e misurano 1066×1600 px: sono utilizzabili per la prova, ma per la consegna definitiva servono file puliti a risoluzione maggiore. Le copie web non sono ingrandite artificialmente.

Le versioni **b** appaiono più schiarite, con minor contrasto locale in alcune zone. Preferisco **a** come punto di partenza; il colore corretto va confermato confrontando la foto con il prodotto reale, idealmente su un monitor calibrato. I file non permettono di stabilire quale trattamento sia stato applicato.

## Cosa mostra la prova

Avviare `npm run dev` (in PowerShell, se necessario, `npm.cmd run dev`) e aprire **http://localhost:4321/prove-foto**. Il terminale indica un'altra porta se 4321 è già occupata. Nella home in sviluppo è presente anche il collegamento sotto l'introduzione della collezione.

Le nove schede confrontano confezione, formato e macro per ciascuna pasta. I menu comprendono tutti i 28 file. I comandi in alto applicano lo stesso rapporto a tutte le foto:

- **4:5:** proposta principale; lascia spazio alle confezioni verticali.
- **1:1:** più compatto; verificare il margine sulle confezioni lunghe.
- **4:3:** rapporto della collezione attuale; il riempimento del riquadro taglia sensibilmente le confezioni verticali.
- **2:3:** fotografia completa; mostra anche scritte e numeri presenti nei provini.

Un clic sulla foto apre sempre l'immagine intera. Nessun filtro colore, ritocco o scontorno è applicato. Il ritaglio è solo di visualizzazione; le copie WebP mantengono l'inquadratura originale. Gli originali in `foto-da-valutare` restano intatti.

La pagina è un confronto locale, non una modifica definitiva alla collezione. È esclusa dalla sitemap e ha `noindex`; non è protetta da password e verrebbe inclusa se si pubblicasse una build del progetto.

## Indicazioni per il prossimo set

1. **Preparare due scatti per ogni formato:** confezione frontale completa e macro della pasta. Aggiungere, se utile, pasta fuori dal sacchetto: negli scatti attuali la plastica resta un elemento visivo importante.
2. **Comporre per il 4:5 già in ripresa.** Provare una guida con circa il 10% di margine sopra e sotto al soggetto. Verificare che chiusura del sacchetto, etichetta e base siano interamente visibili. Conservare anche un originale più ampio.
3. **Uniformare il set:** stesso fondo neutro, bilanciamento del bianco e base d'appoggio. Tenere la fotocamera allineata all'etichetta e controllare verticalità e inclinazione dei pacchi. Armonizzare la dimensione visiva dei diversi formati senza deformarli.
4. **Controllare i riflessi:** luce ampia e morbida, con posizione e intensità regolate sul materiale trasparente. Usare 0012-a come riferimento iniziale, verificando che la plastica non copra il marchio e che la pasta mantenga volume.
5. **Curare le macro:** preservare rugosità e separazione fra i pezzi; evitare zone troppo chiare e dominanti gialle aggiunte. Provare anche dettagli senza plastica nell'inquadratura.
6. **Consegnare file puliti:** niente numeri né annotazioni incorporati. JPEG di alta qualità o TIFF, profilo sRGB per gli export web e almeno 2400 px sul lato lungo; conservare i master ad alta risoluzione. Le foto delle linguine fornite sono 2000×3000, quindi adeguate come dimensioni.

## Inserimento definitivo

La collezione può mantenere tre colonne su desktop e una su telefono, passando il contenitore della foto da `aspect-[4/3]` a `aspect-[4/5]`. Usare un punto di ritaglio controllato per ogni scatto e verificare tutti i formati, soprattutto la pasta lunga. Nella prova, il 4:5 usa `object-position: 50% 40%`; non è una regola da applicare alla cieca alle fotografie future.

Prevedere due miniature o due pulsanti, **Confezione / Dettaglio**, utilizzabili con mouse, tastiera e tocco. Evitare che il dettaglio sia disponibile soltanto passando il mouse. Tenere titolo e informazioni fuori dall'immagine per non coprire la confezione.

Le copie del test sono in `public/prove-foto`: WebP a 480, 960 e 1440 px (1066 px come massimo per gli esagoni), caricate con `srcset`. La mappatura dei file è in `src/data/photo-study.ts`.
