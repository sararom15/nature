// Modulo contatti: campi per argomento, precompilazione da URL e bozza email locale.
const $ = (s) => document.querySelector(s);
const params = new URLSearchParams(location.search);
const form = $('#contact-form');
const sel = form.elements.interesse;
sel.value = params.get('interesse') || 'generali';
if (!sel.value) sel.value = 'generali';
const groups = [...form.querySelectorAll('.request-fields')];
const topicHelp = {
  campionatura: 'Inserisci i dati dell’attività per presentare la tua richiesta di campionatura.',
  box: 'Indica la proposta che ti interessa e quante box vorresti.',
  negozio: 'Presentaci il tuo negozio compilando i dati qui sotto.',
  aziendali: 'Indica l’occasione, la quantità orientativa, la data e la località di consegna.',
};
const update = () => {
  const help = $('#contact-topic-help');
  const text = topicHelp[sel.value] || '';
  help.textContent = text; help.hidden = !text;
  groups.forEach((group) => { const active = group.dataset.topic === sel.value; group.hidden = !active; group.disabled = !active; });
  $('#business-fields').hidden = !groups.some((group) => group.dataset.topic === sel.value);
  if (text) form.elements.messaggio.setAttribute('aria-describedby', 'contact-topic-help');
  else form.elements.messaggio.removeAttribute('aria-describedby');
  // Una bozza già preparata appartiene all'argomento selezionato: va rigenerata dopo ogni modifica.
  $('#draft').hidden = true;
  $('#draft-text').value = '';
  $('#open-mail').removeAttribute('href');
  $('.form-status').textContent = '';
};
update();
sel.addEventListener('change', update);

// Schede "Quattro buoni motivi": selezionano l'argomento e portano al modulo senza ricaricare la pagina.
const modulo = $('#modulo');
document.querySelectorAll('[data-topic]').forEach((card) => card.addEventListener('click', (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  sel.value = card.dataset.topic;
  update();
  history.replaceState(null, '', `?interesse=${card.dataset.topic}#modulo`);
  modulo.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  modulo.classList.remove('is-highlighted');
  void modulo.offsetWidth;
  modulo.classList.add('is-highlighted');
  form.elements.nome.focus({ preventScroll: true });
}));
if (params.get('box')) form.elements.messaggio.value = `Vorrei informazioni sulla box ${['Il primo assaggio', 'La scoperta', 'Da condividere'][Number(params.get('box')) - 1] || 'degustazione'}.`;
const labels = {
  camp_nome: 'Nome dell’attività', camp_tipo: 'Tipo di attività', camp_piva: 'P.IVA', camp_ruolo: 'Ruolo del richiedente', camp_citta: 'Città', camp_provincia: 'Provincia',
  shop_nome: 'Nome del negozio', shop_tipo: 'Tipo di negozio', shop_piva: 'P.IVA', shop_ruolo: 'Ruolo del richiedente', shop_citta: 'Città', shop_provincia: 'Provincia',
  corp_nome: 'Nome dell’azienda', corp_occasione: 'Occasione o finalità', corp_quantita: 'Numero indicativo di box', corp_data: 'Data entro cui servono', corp_localita: 'Località di consegna',
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const f = new FormData(form);
  const subject = 'Nature — ' + sel.selectedOptions[0].text;
  const lines = [`Nome: ${f.get('nome')}`, `Email: ${f.get('email')}`];
  for (const [key, label] of Object.entries(labels)) {
    if (!f.has(key)) continue;
    let value = String(f.get(key) || '').trim();
    if (key === 'corp_data' && /^\d{4}-\d{2}-\d{2}$/.test(value)) value = value.split('-').reverse().join('/');
    lines.push(`${label}: ${value || '—'}`);
  }
  const body = lines.join('\n') + '\n\n' + f.get('messaggio');
  $('#draft-text').value = subject + '\n\n' + body;
  $('#draft').hidden = false;
  $('#open-mail').href = 'mailto:' + (form.dataset.recipient || '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  $('.form-status').textContent = 'Bozza pronta. Controllala e copia il testo oppure aprila nel tuo programma email.';
});
$('#copy-draft').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('#draft-text').value); $('.form-status').textContent = 'Testo copiato.'; }
  catch { $('#draft-text').select(); $('.form-status').textContent = 'Seleziona e copia il testo della bozza.'; }
});
