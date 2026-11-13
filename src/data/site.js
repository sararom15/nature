export const products = [
  { name: 'Paccheri', img: '002.jpg', kind: 'Pasta corta', desc: 'Ampio diametro e una forma essenziale. Da portare in tavola con un ragù, un condimento di mare o una farcitura al forno.' },
  { name: 'Calamarata', img: '001.jpg', kind: 'Pasta corta', desc: 'Anelli larghi, dal profilo netto. Un formato da immaginare con pesce, verdure o un sugo di pomodoro.' },
  { name: 'Fusilloni', img: '007.jpg', kind: 'Pasta corta', desc: 'Una spirale generosa, da osservare giro dopo giro. Da provare con verdure, creme e condimenti della cucina quotidiana.' },
  { name: 'Caserecce', img: '006.jpg', kind: 'Pasta corta', desc: 'Una forma raccolta, incurvata su sé stessa. Un’idea per pesti, sughi di verdure e preparazioni semplici.' },
  { name: 'Linguine', img: '008.jpg', kind: 'Pasta lunga', desc: 'Lunghe e sottili, con la caratteristica sezione piatta. Da abbinare a un condimento di mare o a una preparazione essenziale.' },
];

export const boxes = [
  { n: 'Il primo assaggio', p: '19,90 €', d: 'Una proposta per avvicinarsi al mondo Nature e conoscere la nostra pasta.' },
  { n: 'La scoperta', p: '29,90 €', d: 'Una proposta di degustazione per esplorare più formati, una preparazione alla volta.' },
  { n: 'Da condividere', p: '45,00 €', d: 'Una proposta da regalare o da portare a una tavola condivisa.' },
];

export const nav = [
  { path: 'progetto', label: 'Il Progetto' },
  { path: 'azienda', label: 'L’Azienda Agricola' },
  { path: 'pasta', label: 'La Nostra Pasta' },
  { path: 'professionisti', label: 'Professionisti' },
  { path: 'box', label: 'Le Box ↗', className: 'nav-box' },
  { path: 'contatti', label: 'Contatti', className: 'contact-link' },
];

export const titles = {
  '': 'Nature — Prima la terra. Poi, la pasta.',
  progetto: 'Il progetto Nature — Nature',
  azienda: 'Azienda Agricola Romano — Nature',
  pasta: 'La nostra pasta — Nature',
  professionisti: 'Professionisti — Nature',
  box: 'Box degustazione — Nature',
  contatti: 'Contatti — Nature',
};

/** Dati aziendali: usati nel footer, nella pagina Contatti, nel modulo e nei dati strutturati per Google. */
export const company = {
  name: 'Azienda Agricola Romano',
  vat: '01421290717',
  street: 'Località Iacciolivo',
  zip: '71010',
  city: 'Poggio Imperiale',
  province: 'FG',
  phone: '353 212 5600',
  phoneHref: 'tel:+393532125600',
  email: 'az.agricolaromano@outlook.it',
};

const mapsQuery = encodeURIComponent(`${company.street}, ${company.zip} ${company.city} ${company.province}`);
export const maps = {
  view: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
};

/** Social: lasciare url vuoto finché la pagina non esiste (viene mostrato "In arrivo"). */
export const social = [
  { id: 'instagram', label: 'Instagram', url: '' },
  { id: 'facebook', label: 'Facebook', url: '' },
];

/** Converte un percorso interno ("contatti?interesse=box") nell'URL della pagina. */
export const href = (path = '') => {
  const [p, q] = path.split('?');
  return (p ? `/${p}/` : '/') + (q ? `?${q}` : '');
};
