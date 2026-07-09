// Funzione per scaricare i dati aggiornati
async function fetchCounts() {
    try {
        const response = await fetch('/api/counts');
        const data = await response.json();
        document.getElementById('aura-count').innerText = data.aura;
        document.getElementById('thatsit-count').innerText = data.thatsIt;
    } catch (error) {
        console.error("Errore:", error);
    }
}

// Funzione collegata ai pulsanti per aggiungere +1
async function increment(type) {
    try {
        const response = await fetch(`/api/increment/${type}`, { method: 'POST' });
        const data = await response.json();
        
        // Aggiorna subito il contatore a schermo
        if (type === 'aura') {
            document.getElementById('aura-count').innerText = data.aura;
        } else if (type === 'thatsIt') {
            document.getElementById('thatsit-count').innerText = data.thatsIt;
        }
    } catch (error) {
        console.error("Errore:", error);
    }
}

// Carica i dati appena apri la pagina
fetchCounts();

// Aggiorna in automatico i dati ogni 2 secondi (così vedi i click degli altri)
setInterval(fetchCounts, 2000);
