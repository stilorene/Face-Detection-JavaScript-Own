let emotionChart = null; // Deklariere eine globale Variable, um das Diagramm zu speichern

// Variable zum Speichern der kumulativen Wahrscheinlichkeiten
let cumulativeProbabilities = null;

// Funktion zum Aktualisieren des Emotionsdiagramms
function updateEmotionChart(emotions, probabilities) {
    if (!emotionChart) {
        const ctx = document.getElementById('emotionChartCanvas').getContext('2d');
        emotionChart = new Chart(ctx, {
            type: 'doughnut',
        data: {
            labels: emotions, // Emotionen als Beschriftungen auf der x-Achse
            datasets: [{
                label: 'Emotionswahrscheinlichkeiten', // Beschriftung der Datenreihe
                data: probabilities, // Wahrscheinlichkeiten der Emotionen als Daten
                backgroundColor: [ // Hintergrundfarben der Balken
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [ // Randfarben der Balken
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1 // Randbreite der Balken
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true // Die y-Achse beginnt bei Null
                    }
                }]
            }
        }
    });
     // Die kumulierten Wahrscheinlichkeiten werden mit den aktuellen Wahrscheinlichkeiten initialisiert
     cumulativeProbabilities = probabilities.slice(); // Kopiere die Wahrscheinlichkeiten in die kumulative Variable
    } else {
        // Wenn ein Diagramm bereits vorhanden ist:
        // Addiere die neuen Wahrscheinlichkeiten zu den bereits kumulierten Wahrscheinlichkeiten
        for (let i = 0; i < probabilities.length; i++) {
            cumulativeProbabilities[i] += probabilities[i];
        }

    // Aktualisiere das Diagramm
    emotionChart.data.datasets[0].data = cumulativeProbabilities;
    emotionChart.update();
}
}
