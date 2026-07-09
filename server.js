const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serviamo i file statici (HTML, CSS, JS) dalla cartella "public"
app.use(express.static('public'));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// Funzione per leggere i dati attuali
function readData() {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Funzione per salvare i nuovi dati
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// API: Restituisce i conteggi attuali
app.get('/api/counts', (req, res) => {
    res.json(readData());
});

// API: Incrementa "aura"
app.post('/api/increment/aura', (req, res) => {
    const data = readData();
    data.aura += 1;
    writeData(data);
    res.json(data);
});

// API: Incrementa "and that's it"
app.post('/api/increment/thatsIt', (req, res) => {
    const data = readData();
    data.thatsIt += 1;
    writeData(data);
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`App in ascolto sulla porta ${PORT}`);
});
