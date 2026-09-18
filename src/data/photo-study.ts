export type StudyPhoto = {
  id: string;
  file: string;
  label: string;
  alt: string;
};

const calamarata = (number: string, label: string, description: string): StudyPhoto => ({
  id: `calamarata-${number}`,
  file: `Calamarata/${number}.jpg`,
  label: `${number} · ${label}`,
  alt: `Calamarata Nature: ${description}`,
});

const esagoni = (number: string, label: string, description: string): StudyPhoto => ({
  id: `esagoni-${number}`,
  file: `Esagoni/${number}.jpeg`,
  label: `${number} · ${label}`,
  alt: `Esagoni Nature: ${description}`,
});

const linguine = (number: string, variant: string, label: string, description: string): StudyPhoto => ({
  id: `linguine-${number}-${variant}`,
  file: `Linguine/${number} - ${variant}.jpg`,
  label: `${number}-${variant} · ${label}`,
  alt: `Linguine Nature: ${description}, versione ${variant.toUpperCase()}`,
});

const versions = (number: string, label: string, description: string, recommended = false) =>
  ['a', 'b'].map((variant) => linguine(number, variant,
    `${label}${recommended && variant === 'a' ? ' · Consigliata' : ''}`, description));

export const studyCards = [
  {
    id: 'calamarata-confezione', name: 'Calamarata', category: '01 / La confezione',
    role: 'La prima immagine',
    note: 'Il marchio si riconosce subito. È la scelta di partenza per la scheda prodotto.',
    photos: [calamarata('0003', 'Scelta consigliata', 'confezione con etichetta arancione e turchese')],
  },
  {
    id: 'calamarata-pasta', name: 'Calamarata', category: '02 / Il formato',
    role: 'La forma della pasta',
    note: '0001 mostra meglio gli anelli. Per il prossimo set proverei anche la pasta fuori dal sacchetto.',
    photos: [
      calamarata('0001', 'Vista ampia', 'pasta visibile nel sacchetto trasparente'),
      calamarata('0002', 'Vista laterale', 'sacchetto trasparente visto di lato'),
    ],
  },
  {
    id: 'calamarata-dettaglio', name: 'Calamarata', category: '03 / La materia',
    role: 'Il dettaglio da affiancare',
    note: 'La superficie ruvida diventa protagonista. Funziona come seconda foto, insieme alla confezione.',
    photos: [calamarata('0004', 'Dettaglio consigliato', 'primo piano degli anelli e della loro superficie ruvida')],
  },
  {
    id: 'linguine-confezione', name: 'Linguine', category: '01 / La confezione',
    role: 'La prima immagine',
    note: '0012-a è la mia preferita: etichetta leggibile e maggiore consistenza visiva rispetto alla versione b.',
    photos: [
      ...versions('0012', 'Frontale', 'confezione con etichetta vista frontalmente', true),
      ...versions('0013', 'Tre quarti', 'confezione con etichetta vista di tre quarti'),
    ],
  },
  {
    id: 'linguine-pasta', name: 'Linguine', category: '02 / Il formato',
    role: 'La forma della pasta',
    note: '0010-a è una buona base con due luci. Confrontala con 0006-a: la luce posteriore dà profondità, ma illumina meno uniformemente.',
    photos: [
      ...versions('0010', 'Due luci · frontale', 'pasta nel sacchetto, con due luci anteriori laterali'),
      ...versions('0005', 'Luce posteriore destra', 'pasta nel sacchetto, con luce posteriore destra'),
      ...versions('0006', 'Luce posteriore destra', 'pasta nel sacchetto, con luce posteriore destra'),
      ...versions('0007', 'Luce posteriore destra', 'pasta nel sacchetto, con luce posteriore destra'),
      ...versions('0008', 'Luce posteriore destra', 'pasta nel sacchetto, con luce posteriore destra'),
      ...versions('0009', 'Luce anteriore sinistra', 'pasta nel sacchetto, con luce anteriore sinistra'),
      ...versions('0011', 'Due luci · laterale', 'pasta nel sacchetto vista di lato, con due luci'),
    ],
  },
  {
    id: 'linguine-dettaglio', name: 'Linguine', category: '03 / La materia',
    role: 'Il dettaglio da affiancare',
    note: '0014-a racconta bene la texture. La versione b è più chiara: osserva quanto cambia il rilievo della pasta.',
    photos: versions('0014', 'Macro', 'primo piano della superficie delle linguine', true),
  },
  {
    id: 'esagoni-confezione', name: 'Esagoni', category: '01 / La confezione',
    role: 'La prima immagine',
    note: '0003 rende riconoscibile il marchio e lascia vedere la pasta sotto l’etichetta. È la scelta consigliata per la scheda.',
    photos: [esagoni('0003', 'Scelta consigliata', 'confezione con etichetta arancione e turchese')],
  },
  {
    id: 'esagoni-pasta', name: 'Esagoni', category: '02 / Il formato',
    role: 'La forma della pasta',
    note: '0001 mostra più pezzi e le aperture esagonali. Confrontala con 0002, la vista laterale più stretta; restano visibili i riflessi della plastica.',
    photos: [
      esagoni('0001', 'Vista ampia', 'pasta visibile nel sacchetto trasparente'),
      esagoni('0002', 'Vista laterale', 'sacchetto trasparente visto di lato'),
    ],
  },
  {
    id: 'esagoni-dettaglio', name: 'Esagoni', category: '03 / La materia',
    role: 'Il dettaglio da affiancare',
    note: '0004 mostra bene la rugosità e la sezione esagonale. Funziona come seconda foto, insieme alla confezione.',
    photos: [esagoni('0004', 'Dettaglio consigliato', 'primo piano della superficie ruvida e delle aperture esagonali')],
  },
];

export const photoSrc = (id: string, width = 960) => `/prove-foto/${id}-${width}.webp`;
// I provini degli esagoni sono larghi 1066 px: non vengono ingranditi.
export const photoMaxWidth = (id: string) => id.startsWith('esagoni-') ? 1066 : 1440;
export const photoSrcSet = (id: string) =>
  [480, 960, photoMaxWidth(id)].map((width) => `${photoSrc(id, width)} ${width}w`).join(', ');
