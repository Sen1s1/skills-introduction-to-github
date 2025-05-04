/**
 * Elenco degli atleti registrati.
 * @type {Array<{nome: string, cognome: string, eta: string, tessera: string}>}
 */
const atleti = [];

/**
 * Elenco delle gare create.
 * @type {Array<{nome: string, data: string, partecipanti: string[]}>}
 */
const gare = [];

/**
 * Oggetto con i punteggi associati alla tessera di ciascun atleta.
 * @type {Object.<string, number>}
 */
const punteggi = [];

/**
 * Aggiunge un nuovo atleta leggendo i dati da un form HTML.
 * Verifica i campi obbligatori, crea l'oggetto atleta e aggiorna la lista dei partecipanti.
 * Mostra un messaggio di conferma.
 */
function aggiungiAtleta() {
  let nome = document.getElementById("nome").value;
  let cognome = document.getElementById("cognome").value;
  let eta = document.getElementById("eta").value;
  let tessera = document.getElementById("tessera").value;

  if (nome === "" || cognome === "" || tessera === "") {
    alert("Compila tutti i campi!");
    return;
  }

  let nuovoAtleta = { nome, cognome, eta, tessera };
  atleti.push(nuovoAtleta);
  punteggi[tessera] = 0;
  mostraPartecipanti();
  alert("Atleta aggiunto!");
}

/**
 * Mostra la lista degli atleti registrati come checkbox,
 * permettendo di selezionarli per una gara.
 * Crea anche un pulsante per registrare i risultati.
 */
function mostraPartecipanti() {
  let div = document.getElementById("selezioneAtleti");
  div.innerHTML = "<h3>Seleziona Partecipanti:</h3>";

  for (let i = 0; i < atleti.length; i++) {
    let atleta = atleti[i];
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = atleta.tessera;
    checkbox.id = "chk-" + atleta.tessera;

    let label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.innerText = atleta.nome + " " + atleta.cognome;

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(document.createElement("br"));
  }

  let bottone = document.createElement("button");
  bottone.innerText = "Registra Risultati";
  bottone.onclick = registraRisultati;
  div.appendChild(bottone);
}

/**
 * Crea una nuova gara leggendo nome e data dal form HTML.
 * Aggiunge la gara all'elenco e mostra un messaggio di conferma.
 */
function creaGara() {
  let nomeGara = document.getElementById("nomeGara").value;
  let dataGara = document.getElementById("dataGara").value;

  if (nomeGara === "" || dataGara === "") {
    alert("Inserisci nome e data!");
    return;
  }

  let nuovaGara = { nome: nomeGara, data: dataGara, partecipanti: [] };
  gare.push(nuovaGara);
  alert("Gara creata!");
}

/**
 * Registra i risultati della gara corrente.
 * Seleziona i partecipanti tramite checkbox,
 * li ordina in modo casuale e assegna punteggi.
 * Aggiorna la classifica generale.
 */
function registraRisultati() {
  if (gare.length === 0) {
    alert("Crea prima una gara!");
    return;
  }

  let garaCorrente = gare[gare.length - 1];
  let partecipanti = [];
  let inputs = document.querySelectorAll('#selezioneAtleti input[type="checkbox"]');

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      partecipanti.push(inputs[i].value);
    }
  }

  if (partecipanti.length === 0) {
    alert("Seleziona almeno un partecipante.");
    return;
  }

  for (let i = partecipanti.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [partecipanti[i], partecipanti[j]] = [partecipanti[j], partecipanti[i]];
  }

  for (let i = 0; i < partecipanti.length; i++) {
    let tessera = partecipanti[i];
    let punti = 10 - i * 2;
    if (punti < 0) punti = 0;
    punteggi[tessera] += punti;
  }

  mostraClassifica();
  alert("Risultati registrati!");
}

/**
 * Mostra la classifica generale ordinata per punteggio decrescente.
 * Legge i dati da `atleti` e `punteggi`, li ordina e li visualizza in una lista HTML.
 */
function mostraClassifica() {
  let lista = document.getElementById("classifica");
  lista.innerHTML = "";

  let arrayClassifica = [];
  for (let i = 0; i < atleti.length; i++) {
    let atleta = atleti[i];
    let punti = punteggi[atleta.tessera];
    arrayClassifica.push({ nome: atleta.nome + " " + atleta.cognome, punti });
  }

  arrayClassifica.sort((a, b) => b.punti - a.punti);

  for (let i = 0; i < arrayClassifica.length; i++) {
    let li = document.createElement("li");
    li.innerText = arrayClassifica[i].nome + ": " + arrayClassifica[i].punti + " punti";
    lista.appendChild(li);
  }
}
